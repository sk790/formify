"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "../ui/form";
import { cn } from "@/lib/utils";
import { FaCamera } from "react-icons/fa";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "../ui/use-toast";
import Webcam from "react-webcam";
import React from "react";

const type: ElementsType = "CameraField";

const extraAttributes = {
  label: "Upload File",
  helperText: "Upload a file here",
  required: false,
  hasHelperText: false,
  allowedFileTypes: "",
  maxFileSize: 5,
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(40),
  helperText: z.string().max(40),
  required: z.boolean().default(false),
  hasHelperText: z.boolean().default(false),
  allowedFileTypes: z.string().max(100).optional(),
  maxFileSize: z.number().min(1).max(50).default(5),
});

export const CameraFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: FaCamera,
    label: "Camera",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const getReadableFileType = (type: string | undefined) => {
  if (!type || type === "all") return "All types";
  if (type === ".pdf") return "PDF";
  if (type === "image/*") return "Images";
  if (type === ".xls,.xlsx") return "Excel";
  if (type === ".doc,.docx") return "Word";
  return type;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required, hasHelperText, allowedFileTypes, maxFileSize } = element.extraAttributes;
  const { updateElement, selectedElement } = useDesigner();
  const isSelected = selectedElement?.id === element.id;

  const updateProp = (key: string, value: any) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        [key]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-1 w-full">
        {isSelected ? (
          <Input
            value={label}
            onChange={(e) => updateProp("label", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            placeholder="Field Label"
            className="text-base font-medium border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm h-auto py-1 shadow-none pointer-events-auto flex-grow"
          />
        ) : (
          <Label className="text-base font-medium">{label}</Label>
        )}
        {required && <span className="text-red-500">*</span>}
      </div>

      {!isSelected && (
        <p className="text-[0.8rem] text-muted-foreground mt-[-4px]">
          Max size: {maxFileSize || 5}MB | Allowed: {getReadableFileType(allowedFileTypes)}
        </p>
      )}

      <div className="border border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center bg-accent/30 text-muted-foreground pointer-events-none">
        <FaCamera className="h-8 w-8 mb-2" />
        <span className="text-sm">Click to upload file (Designer preview)</span>
      </div>

      {isSelected && (
        <div className="flex gap-2 w-full mt-2">
          <div className="flex flex-col px-1 w-full pointer-events-auto">
            <Select
              value={allowedFileTypes || "all"}
              onValueChange={(value) => updateProp("allowedFileTypes", value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-full text-xs h-8 border-none bg-accent/20 hover:bg-accent/50 focus-visible:ring-0 shadow-none">
                <SelectValue placeholder="File type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All File Types</SelectItem>
                <SelectItem value=".pdf">PDF Documents</SelectItem>
                <SelectItem value="image/*">Images</SelectItem>
                <SelectItem value=".xls,.xlsx">Excel (.xls)</SelectItem>
                <SelectItem value=".doc,.docx">Docs (.doc)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col px-1 w-full pointer-events-auto">
            <Select
              value={maxFileSize?.toString() || "5"}
              onValueChange={(value) => updateProp("maxFileSize", parseInt(value))}
            >
              <SelectTrigger className="w-full text-xs h-8 border-none bg-accent/20 hover:bg-accent/50 focus-visible:ring-0 shadow-none">
                <SelectValue placeholder="Max size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 MB</SelectItem>
                <SelectItem value="2">2 MB</SelectItem>
                <SelectItem value="5">5 MB</SelectItem>
                <SelectItem value="10">10 MB</SelectItem>
                <SelectItem value="20">20 MB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {hasHelperText && (
        isSelected ? (
          <Input
            value={helperText}
            onChange={(e) => updateProp("helperText", e.target.value)}
            placeholder="Helper text"
            className="text-[0.8rem] rounded-sm text-muted-foreground pl-2 border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 h-auto py-1 shadow-none pointer-events-auto"
          />
        ) : (
          helperText && (
            <p className="text-[0.8rem] text-muted-foreground pl-2">{helperText}</p>
          )
        )
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValues,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValues?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValues || "");
  const [error, setError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = React.useRef<any>(null);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required, hasHelperText } = element.extraAttributes;

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setIsCameraOpen(false);
    setIsUploading(true);
    setError(false);
    
    try {
      const fetchResponse = await fetch(imageSrc);
      const blob = await fetchResponse.blob();
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      const fileUrl = data.secure_url;
      
      setValue(fileUrl);
      if (submitValue) {
        const valid = CameraFieldFormElement.validate(element, fileUrl);
        setError(!valid);
        submitValue(element.id, fileUrl);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      toast({
        title: "Upload failed",
        description: "Failed to upload the captured photo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> * </span>}
      </Label>
      
      {!value ? (
        <div className="relative w-full">
          {isCameraOpen ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-full relative rounded-md overflow-hidden bg-black flex justify-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  mirrored={true}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  className="w-full max-h-[400px] object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={capture}>
                  Capture Photo
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCameraOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsCameraOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-[150px] border-2 border-dashed rounded-md cursor-pointer bg-accent/20 hover:bg-accent/40 transition-colors",
                error && "border-red-500",
                isUploading && "pointer-events-none opacity-50"
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                  <span className="text-sm font-medium">Uploading...</span>
                </>
              ) : (
                <>
                  <FaCamera className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">Tap to open Camera</span>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full rounded-md overflow-hidden bg-black/5 flex justify-center border-2 border-border">
          <img 
            src={value} 
            alt="Captured photo" 
            className="w-full max-h-[400px] object-contain" 
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              setValue("");
              if (submitValue) submitValue(element.id, "");
            }}
          >
            Remove
          </Button>
        </div>
      )}

      {hasHelperText && helperText && (
        <p className={cn("text-sm text-muted-foreground pl-2", error && "text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      hasHelperText: element.extraAttributes.hasHelperText,
      allowedFileTypes: element.extraAttributes.allowedFileTypes,
      maxFileSize: element.extraAttributes.maxFileSize,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(data: propertiesFormSchemaType) {
    const { label, helperText, required, hasHelperText, allowedFileTypes, maxFileSize } = data;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        hasHelperText,
        allowedFileTypes,
        maxFileSize,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the field
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allowedFileTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allowed File Types</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val === "all" ? "" : val)}
                value={field.value || "all"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select allowed file types" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All File Types</SelectItem>
                  <SelectItem value=".pdf">PDF Documents (.pdf)</SelectItem>
                  <SelectItem value="image/*">Images (all types)</SelectItem>
                  <SelectItem value=".xls,.xlsx">Excel Files (.xls, .xlsx)</SelectItem>
                  <SelectItem value=".doc,.docx">Word Docs (.doc, .docx)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Restrict the types of files users can upload.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxFileSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max File Size</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(parseInt(val))}
                value={field.value?.toString() || "5"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select max file size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 MB</SelectItem>
                  <SelectItem value="2">2 MB</SelectItem>
                  <SelectItem value="5">5 MB</SelectItem>
                  <SelectItem value="10">10 MB</SelectItem>
                  <SelectItem value="20">20 MB</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Maximum allowed file size in Megabytes.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
