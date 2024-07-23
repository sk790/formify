import React from "react";
import ToolBarBtnElement from "./ToolBarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

function FormElementSidebar() {
  return (
    <div>
      <p className="text-sm text-muted-foreground text-center">
        Drag and drop elements
      </p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-2">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 md:place-self-start text-center">
          Layout Elements
        </p>
        <p></p>
        <ToolBarBtnElement formElement={FormElements.TittleField} />
        <ToolBarBtnElement formElement={FormElements.SubTittleField} />
        <ToolBarBtnElement formElement={FormElements.ParagraphField} />
        <ToolBarBtnElement formElement={FormElements.SeparatorField} />
        <ToolBarBtnElement formElement={FormElements.SpacerField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 md:place-self-start text-center">
          Form Elements
        </p>
        <p></p>
        <ToolBarBtnElement formElement={FormElements.TextField} />
        <ToolBarBtnElement formElement={FormElements.NumberField} />
        <ToolBarBtnElement formElement={FormElements.TextAreaField} />
        <ToolBarBtnElement formElement={FormElements.DateField} />
        <ToolBarBtnElement formElement={FormElements.SelectField} />
        <ToolBarBtnElement formElement={FormElements.CheckBoxField} />
      </div>
    </div>
  );
}

export default FormElementSidebar;
