"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "Helper text",
  required: true,
  placeholder: "Placeholder",
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(40),
  helperText: z.string().max(40),
  required: z.boolean().default(false),
  placeholder: z.string().max(40),
});

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>formComponent</div>,
  propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
const { updateElement } = useDesigner();

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(data: propertiesFormSchemaType) {
    const { label, helperText, required, placeholder } = data;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        placeholder,
      },
    });
  }

  return <div>propertiesComponent{}</div>;
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && <span className="text-red-500"> * </span>}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
