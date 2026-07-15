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
import { BsToggleOn } from "react-icons/bs";
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
import { Checkbox } from "../ui/checkbox";

const type: ElementsType = "SwitchField";

const extraAttributes = {
  label: "Switch Field",
  helperText: "Helper text",
  required: false,
  hasHelperText: false,
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(40),
  helperText: z.string().max(40),
  required: z.boolean().default(false),
  hasHelperText: z.boolean().default(false),
});

export const SwitchFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: BsToggleOn,
    label: "Checkbox",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === "true";
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(data: propertiesFormSchemaType) {
    const { label, helperText, required } = data;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          name="label"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Description</FormDescription>
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="helperText"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Description</FormDescription>
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="required"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-md">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>Description</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required, hasHelperText } = element.extraAttributes;
  const id = `switch-${element.id}`;
  const { selectedElement, updateElement } = useDesigner();
  const isSelected = selectedElement?.id === element.id;

  function updateProp(key: string, value: any) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        [key]: value,
      },
    });
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center space-x-2 w-full">
        <Switch id={id} disabled />
        <div className="flex-grow w-full">
          {isSelected ? (
            <div className="flex items-center gap-1 w-full">
              <Input
                value={label}
                onChange={(e) => updateProp("label", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
                placeholder="Switch Label"
                className="text-base font-medium border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm h-auto py-1 shadow-none pointer-events-auto flex-grow"
              />
              {required && <span className="text-red-500">*</span>}
            </div>
          ) : (
            <Label htmlFor={id} className="text-base font-medium flex items-center gap-1 leading-none">
              {label}
              {required && <span className="text-red-500"> * </span>}
            </Label>
          )}
        </div>
      </div>
      
      <div className="pl-6 w-full mt-1.5">
        {hasHelperText && (
          isSelected ? (
            <Input
              value={helperText}
              onChange={(e) => updateProp("helperText", e.target.value)}
              placeholder="Helper text"
              className="text-[0.8rem] rounded-sm text-muted-foreground pl-2 border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 h-auto py-1 shadow-none pointer-events-auto w-full"
            />
          ) : (
            helperText && (
              <p className="text-[0.8rem] text-muted-foreground pl-2">{helperText}</p>
            )
          )
        )}
      </div>
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

  const [value, setValue] = useState<boolean>(
    defaultValues === "true" ? true : false
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required, hasHelperText } = element.extraAttributes;
  const id = `switch-${element.id}`;
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center space-x-2 w-full">
        <Switch
          id={id}
          checked={value}
          className={cn(error && "border-red-500")}
          onCheckedChange={(checked) => {
            let value = false;
            if (checked === true) value = true;
            setValue(value);
            if (!submitValue) return;
            const stringValue = value ? "true" : "false";
            const valid = SwitchFieldFormElement.validate(element, stringValue);
            setError(!valid);
            submitValue(element.id, stringValue);
          }}
        />
        <div className="flex-grow w-full">
          <Label htmlFor={id} className={cn("leading-none", error && "text-red-500")}>
            {label}
            {required && <span className="text-red-500"> * </span>}
          </Label>
        </div>
      </div>
      
      <div className="pl-6 w-full mt-1.5">
        {hasHelperText && helperText && (
          <p
            className={cn(
              "text-sm text-muted-foreground pl-2 rounded-sm",
              error && "text-red-500"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
