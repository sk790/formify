"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import useDesigner from "../hooks/useDesigner";
import { LuLayoutTemplate } from "react-icons/lu";

const type: ElementsType = "FormHeaderField";

const extraAttributes = {
  title: "Form Title",
  description: "Provide a description for your form.",
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
});

export const FormHeaderFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: LuLayoutTemplate,
    label: "Header",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  validate: () => true,
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
  const { title, description } = element.extraAttributes;
  const { updateElement, selectedElement } = useDesigner();
  const isSelected = selectedElement?.id === element.id;

  const updateProp = (key: keyof typeof extraAttributes, value: string) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        [key]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full p-4 border rounded-md bg-background">
      {isSelected ? (
        <div className="flex flex-col gap-2">
          <Input
            value={title}
            onChange={(e) => updateProp("title", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            placeholder="Form Title"
            className="text-2xl md:text-3xl font-bold border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm h-auto py-1 shadow-none pointer-events-auto pl-2"
          />
          <Textarea
            value={description}
            onChange={(e) => updateProp("description", e.target.value)}
            placeholder="Form Description (optional)"
            className="text-muted-foreground border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm min-h-[80px] shadow-none pointer-events-auto resize-none pl-2"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2 pl-2">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
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
  const { title, description } = element.extraAttributes;
  
  return (
    <div className="flex flex-col gap-2 w-full pb-4 border-b">
      <h1 className="text-2xl md:text-3xl font-bold pl-2">{title}</h1>
      {description && <p className="text-muted-foreground pl-2">{description}</p>}
    </div>
  );
}
