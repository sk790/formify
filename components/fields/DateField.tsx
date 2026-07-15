"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const type: ElementsType = "DateField";

const extraAttributes = {
  label: "Date Field",
  helperText: "Pick a date",
  required: false,
  hasHelperText: false,
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(40),
  helperText: z.string().max(40),
  required: z.boolean().default(false),
  hasHelperText: z.boolean().default(false),
});

export const DateFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: BsFillCalendarDateFill,
    label: "Date",
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
            placeholder="Question Label"
            className="text-base font-medium border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm h-auto py-1 shadow-none pointer-events-auto flex-grow"
          />
        ) : (
          <Label className="text-base font-medium">{label}</Label>
        )}
        {required && <span className="text-red-500">*</span>}
      </div>

      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>Pick a date</span>
      </Button>

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

  const [date, setDate] = useState<Date | undefined>(
    defaultValues ? new Date(defaultValues) : undefined
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required, hasHelperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> * </span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              if (!submitValue) return;
              const value = date?.toUTCString() || "";
              const valid = DateFieldFormElement.validate(element, value);
              setError(!valid);
              submitValue(element.id, value);
            }}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={1900}
            toYear={2100}
          />
        </PopoverContent>
      </Popover>
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
