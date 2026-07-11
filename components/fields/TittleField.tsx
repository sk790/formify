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

const type: ElementsType = "TittleField";

const extraAttributes = {
  tittle: "Tittle Field",
};

const propertiesSchema = z.object({
  tittle: z.string().min(3).max(40),
});

export const TittleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: LuHeading1,
    label: "Tittle",
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
  const { tittle } = element.extraAttributes;
  const { updateElement, selectedElement } = useDesigner();
  const isSelected = selectedElement?.id === element.id;

  const updateProp = (value: string) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        tittle: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {isSelected ? (
        <Input
          value={tittle}
          onChange={(e) => updateProp(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          className="text-lg md:text-xl font-bold pl-2 border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm h-auto py-1 shadow-none pointer-events-auto"
        />
      ) : (
        <p className="text-lg md:text-xl font-bold pl-2">{tittle}</p>
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

  const { tittle } = element.extraAttributes;
  return <p className="text-lg md:text-xl pl-2">{tittle}</p>;
}
