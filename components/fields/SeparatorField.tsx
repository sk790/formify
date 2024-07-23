"use client";

import { ElementsType, FormElement } from "../FormElements";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { RiSeparator } from "react-icons/ri";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  desinerBtnElement: {
    icon: RiSeparator,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function PropertiesComponent() {
  return <p>No Property foe this component</p>;
}

function DesignerComponent() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Separator Field</Label>
      <Separator />
    </div>
  );
}
function FormComponent() {
  return <Separator />;
}
