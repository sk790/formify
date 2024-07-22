import React from "react";
import ToolBarBtnElement from "./ToolBarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

function FormElementSidebar() {
  return (
    <div>
      <p className="text-sm text-muted-foreground">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-2">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout Elements
        </p>
        <ToolBarBtnElement formElement={FormElements.TextField} />
        <ToolBarBtnElement formElement={FormElements.TittleField} />
        <ToolBarBtnElement formElement={FormElements.SubTittleField} />
      </div>
    </div>
  );
}

export default FormElementSidebar;
