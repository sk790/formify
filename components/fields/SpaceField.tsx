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
import { LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20,
};

const propertiesSchema = z.object({
  height: z.number().min(3).max(500),
});

export const SpacerFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: MdTextFields,
    label: "Spacer",
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

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;


function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;
  const { updateElement, selectedElement } = useDesigner();
  const isSelected = selectedElement?.id === element.id;

  const updateProp = (value: number) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center pointer-events-auto">
      {isSelected && (
        <div className="flex items-center gap-4 w-full justify-center">
           <Label className="text-sm font-medium">Height ({height}px)</Label>
           <Slider
             value={[height]}
             min={5}
             max={200}
             step={1}
             onValueChange={(val) => updateProp(val[0])}
             className="w-[200px]"
           />
        </div>
      )}
      {!isSelected && (
        <>
          <Label className="text-muted-foreground">Spacer Field: {height}px</Label>
          <LuSeparatorHorizontal className="h-8 w-8 text-muted-foreground" />
        </>
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

  const { height } = element.extraAttributes;
  return <div style={{ height, width: "100%" }}></div>;
}
