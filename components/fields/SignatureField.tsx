"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import useDesigner from "@/components/hooks/useDesigner";
import { FaPenFancy } from "react-icons/fa";
import { cn } from "@/lib/utils";
import SignatureCanvas from "react-signature-canvas";
import { useTheme } from "next-themes";

const type: ElementsType = "SignatureField";

const extraAttributes = {
  label: "Signature",
  helperText: "Sign below",
  required: false,
  hasHelperText: true,
};

export const SignatureFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: FaPenFancy,
    label: "Signature Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: () => null, // Inline properties like CheckboxGridField/LocationField
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

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText, hasHelperText } = element.extraAttributes;
  const { selectedElement, updateElement } = useDesigner();
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

      <div className="h-[150px] w-full rounded-md border-2 border-dashed flex flex-col items-center justify-center bg-accent/20 pointer-events-none mt-2">
        <FaPenFancy className="h-8 w-8 text-muted-foreground mb-2" />
        <span className="text-muted-foreground text-sm font-medium">Signature Area (Preview)</span>
      </div>

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
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, helperText, hasHelperText } = element.extraAttributes;

  const handleEnd = () => {
    if (!sigCanvas.current) return;
    const base64Str = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setValue(base64Str);
    
    if (!submitValue) return;
    const valid = SignatureFieldFormElement.validate(element, base64Str);
    setError(!valid);
    if (!valid) return;
    submitValue(element.id, base64Str);
  };

  const clear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sigCanvas.current) return;
    sigCanvas.current.clear();
    setValue("");
    
    if (!submitValue) return;
    const valid = SignatureFieldFormElement.validate(element, "");
    setError(!valid);
    submitValue(element.id, "");
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      
      <div className={cn("relative border-2 rounded-md bg-background overflow-hidden", error && "border-red-500")}>
        <SignatureCanvas
          ref={sigCanvas}
          penColor={theme === "dark" || (theme === "system" && systemTheme === "dark") ? "white" : "black"}
          canvasProps={{ className: "w-full h-[150px] cursor-crosshair touch-none" }}
          onEnd={handleEnd}
        />
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clear}
          className="absolute bottom-2 right-2 h-7 px-2 text-xs z-10"
        >
          Clear
        </Button>
      </div>
      
      {hasHelperText && helperText && (
        <p
          className={cn(
            "text-[0.8rem] text-muted-foreground pl-2 mt-2",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
