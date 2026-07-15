"use client";

import { BiTime } from "react-icons/bi";
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
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const type = "TimeField" as ElementsType;

const extraAttributes = {
  label: "Time Field",
  helperText: "Pick a time",
  required: false,
  hasHelperText: false,
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(40),
  helperText: z.string().max(40),
  required: z.boolean().default(false),
  hasHelperText: z.boolean().default(false),
});

export const TimeFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: BiTime,
    label: "Time",
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

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const periods = ["AM", "PM"];

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required, hasHelperText } = element.extraAttributes;
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

      <div className="flex gap-2 w-full pointer-events-none opacity-80">
        <Select disabled>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
        </Select>
        <span className="flex items-center">:</span>
        <Select disabled>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
        </Select>
        <Select disabled>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
        </Select>
      </div>

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

  // defaultValues format: "10:30 AM" or empty
  const defaultHour = defaultValues ? defaultValues.split(":")[0] : "";
  const defaultMinute = defaultValues ? defaultValues.split(":")[1]?.split(" ")[0] : "";
  const defaultPeriod = defaultValues ? defaultValues.split(" ")[1] : "AM";

  const [hour, setHour] = useState(defaultHour);
  const [minute, setMinute] = useState(defaultMinute);
  const [period, setPeriod] = useState(defaultPeriod || "AM");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  useEffect(() => {
    if (hour && minute) {
      const timeStr = `${hour}:${minute} ${period}`;
      if (submitValue) {
        const valid = TimeFieldFormElement.validate(element, timeStr);
        setError(!valid);
        submitValue(element.id, timeStr);
      }
    } else if (submitValue) {
       // if incomplete, it's not valid if required
       submitValue(element.id, "");
       if (element.extraAttributes.required) {
          setError(true);
       }
    }
  }, [hour, minute, period]);

  const { label, helperText, required, hasHelperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> * </span>}
      </Label>
      
      <div className={cn("flex gap-2 w-full", error && "p-1 border border-red-500 rounded-md")}>
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {hours.map(h => (
              <SelectItem key={h} value={h}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="flex items-center font-bold">:</span>
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            {periods.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
