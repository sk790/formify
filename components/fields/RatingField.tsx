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
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

const type: ElementsType = "RatingField";

const extraAttributes = {
  label: "Rating Field",
  helperText: "Please rate your experience",
  required: false,
  hasHelperText: false,
  ratingType: "star",
  hasCommentField: false,
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(40),
  helperText: z.string().max(40),
  required: z.boolean().default(false),
  hasHelperText: z.boolean().default(false),
  ratingType: z.string().default("star"),
  hasCommentField: z.boolean().default(false),
});

export const RatingFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: FaStar,
    label: "Rating",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      let rating = 0;
      try {
        const parsed = JSON.parse(currentValue);
        rating = parsed.rating || 0;
      } catch {
        rating = parseInt(currentValue) || 0;
      }
      return rating > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const emojis = ["😡", "😕", "😐", "🙂", "😍"];

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText, hasHelperText, ratingType, hasCommentField } = element.extraAttributes;
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
            placeholder="Question Label"
            className="text-base font-medium border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm h-auto py-1 shadow-none pointer-events-auto flex-grow"
          />
        ) : (
          <Label className="text-base font-medium">{label}</Label>
        )}
        {required && <span className="text-red-500"> *</span>}
      </div>

      <div className="flex gap-2 items-center pointer-events-none mt-2">
        {[1, 2, 3, 4, 5].map((val) => (
          <div key={val} className="text-3xl text-muted-foreground opacity-50 transition-all">
            {ratingType === "emoji" ? emojis[val - 1] : <FaStar />}
          </div>
        ))}
      </div>

      {hasCommentField && (
        <div className="w-full mt-2 pointer-events-none opacity-50">
          <Input placeholder="Leave a comment (optional)" readOnly />
        </div>
      )}

      {hasHelperText && (
        isSelected ? (
          <Input
            value={helperText}
            onChange={(e) => updateProp("helperText", e.target.value)}
            placeholder="Helper text"
            className="text-[0.8rem] rounded-sm text-muted-foreground pl-2 border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 h-auto py-1 shadow-none pointer-events-auto mt-2"
          />
        ) : (
          helperText && (
            <p className="text-[0.8rem] text-muted-foreground pl-2 mt-2">{helperText}</p>
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

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required, hasHelperText, ratingType, hasCommentField } = element.extraAttributes;

  const handleSelect = (val: number) => {
    let currentComment = "";
    try {
      const parsed = JSON.parse(value);
      currentComment = parsed.comment || "";
    } catch {}
    
    const newValue = JSON.stringify({ rating: val, comment: currentComment });
    setValue(newValue);
    if (submitValue) {
      const valid = RatingFieldFormElement.validate(element, newValue);
      setError(!valid);
      submitValue(element.id, newValue);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value;
    let currentRating = 0;
    try {
      const parsed = JSON.parse(value);
      currentRating = parsed.rating || 0;
    } catch {
      currentRating = parseInt(value) || 0;
    }
    
    const newValue = JSON.stringify({ rating: currentRating, comment: newComment });
    setValue(newValue);
    if (submitValue) {
      const valid = RatingFieldFormElement.validate(element, newValue);
      setError(!valid);
      submitValue(element.id, newValue);
    }
  };

  let currentVal = 0;
  let commentVal = "";
  try {
    const parsed = JSON.parse(value);
    currentVal = parsed.rating || 0;
    commentVal = parsed.comment || "";
  } catch {
    currentVal = parseInt(value) || 0;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      
      <div className="flex gap-4 items-center mt-2">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => handleSelect(val)}
            className={cn(
              "text-3xl transition-all hover:scale-110",
              ratingType === "star" && val <= currentVal ? "text-yellow-400" : ratingType === "star" ? "text-muted-foreground opacity-50" : "",
              ratingType === "emoji" && val === currentVal ? "scale-125 grayscale-0" : ratingType === "emoji" ? "grayscale opacity-50" : ""
            )}
          >
            {ratingType === "emoji" ? emojis[val - 1] : <FaStar />}
          </button>
        ))}
      </div>

      {hasCommentField && (
        <div className="w-full mt-2">
          <Input 
            placeholder="Leave a comment (optional)" 
            value={commentVal}
            onChange={handleCommentChange}
            onBlur={(e) => {
              if (!submitValue) return;
              const valid = RatingFieldFormElement.validate(element, value);
              setError(!valid);
              submitValue(element.id, value);
            }}
          />
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

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
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
      ratingType: element.extraAttributes.ratingType,
      hasCommentField: element.extraAttributes.hasCommentField,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, required, hasHelperText, ratingType, hasCommentField } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        hasHelperText,
        ratingType,
        hasCommentField,
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
          name="ratingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating Type</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  form.handleSubmit(applyChanges)();
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="star">Star Rating (⭐)</SelectItem>
                  <SelectItem value="emoji">Emoji Rating (😍)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose whether to display stars or emojis</FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="hasCommentField"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Include Comment</FormLabel>
                <FormDescription>Allow users to leave a comment with their rating.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(val) => {
                    field.onChange(val);
                    form.handleSubmit(applyChanges)();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasHelperText"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Helper text</FormLabel>
                <FormDescription>Show or hide the helper text.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(val) => {
                    field.onChange(val);
                    form.handleSubmit(applyChanges)();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {form.watch("hasHelperText") && (
          <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper text content</FormLabel>
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
        )}
        
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>Ensure the user provides a rating.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(val) => {
                    field.onChange(val);
                    form.handleSubmit(applyChanges)();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
