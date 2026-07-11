"use client";

import { IoRadioButtonOn } from "react-icons/io5";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const type: ElementsType = "RadioField";

const extraAttributes = {
  label: "Question",
  helperText: "Helper text",
  required: false,
  hasHelperText: false,
  options: ["Option 1", "Option 2"] as string[],
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(40),
  helperText: z.string().max(40),
  required: z.boolean().default(false),
  hasHelperText: z.boolean().default(false),
  options: z.array(z.string()).default(["Option 1", "Option 2"]),
});

export const RadioFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: IoRadioButtonOn,
    label: "Radio Group",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
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

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required, hasHelperText, options } = element.extraAttributes;
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

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    updateProp("options", newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    updateProp("options", newOptions);
  };

  const addOption = () => {
    updateProp("options", [...options, `Option ${options.length + 1}`]);
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
        {required && <span className="text-red-500">*</span>}
      </div>

      {isSelected ? (
        <div className="flex flex-col gap-2 w-full pointer-events-auto">
          {options.map((option, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <Input
                placeholder="Option text"
                value={option}
                className="h-8"
                onChange={(e) => updateOption(index, e.target.value)}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  removeOption(index);
                }}
              >
                <AiOutlineClose />
              </Button>
            </div>
          ))}
          <Button
            variant={"outline"}
            size="sm"
            className="gap-2 h-8 w-fit mt-2"
            onClick={(e) => {
              e.preventDefault();
              addOption();
            }}
          >
            <AiOutlinePlus />
            Add Option
          </Button>
        </div>
      ) : (
        <RadioGroup className="flex flex-col space-y-1">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`radio-${index}`} disabled />
                <Label htmlFor={`radio-${index}`}>{option}</Label>
              </div>
            ))
          ) : (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dummy" disabled />
              <Label>No options yet</Label>
            </div>
          )}
        </RadioGroup>
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

  const { label, helperText, required, hasHelperText, options } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  useEffect(() => {
    if (defaultValues) {
      setValue(defaultValues);
    }
  }, [defaultValues]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> * </span>}
      </Label>
      
      <RadioGroup
        defaultValue={value}
        onValueChange={(val) => {
          setValue(val);
          if (!submitValue) return;
          const valid = RadioFieldFormElement.validate(element, val);
          setError(!valid);
          submitValue(element.id, val);
        }}
        className={cn("flex flex-col space-y-1 mt-2", error && "border border-red-500 p-2 rounded-md")}
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`form-radio-${element.id}-${index}`} />
            <Label htmlFor={`form-radio-${element.id}-${index}`} className="font-normal cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {hasHelperText && helperText && (
        <p
          className={cn(
            "text-sm text-muted-foreground pl-2",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
