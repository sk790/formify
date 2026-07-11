"use client";

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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { LuHeading1 } from "react-icons/lu";
import { BsParagraph, BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
  text: "Text here",
};

const propertiesSchema = z.object({
  text: z.string().min(3).max(600),
});

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: BsTextParagraph,
    label: "Paragraph",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;



function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;
  const { updateElement, selectedElement } = useDesigner();
  const isSelected = selectedElement?.id === element.id;

  const updateProp = (value: string) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {isSelected ? (
        <Textarea
          value={text}
          onChange={(e) => updateProp(e.target.value)}
          rows={3}
          className="text-base pl-2 border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm shadow-none resize-none pointer-events-auto"
        />
      ) : (
        <p className="text-base pl-2 rounded-sm">{text}</p>
      )}
    </div>
  );
}
function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;
  return <p>{text}</p>;
}
