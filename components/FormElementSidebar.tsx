import React from "react";
import ToolBarBtnElement from "./ToolBarBtnElement";
import { FormElements } from "./FormElements";

function FormElementSidebar() {
  return (
    <div>
      <ToolBarBtnElement formElement={FormElements.TextField} />
      <ToolBarBtnElement formElement={FormElements.TittleField} />
    </div>
  );
}

export default FormElementSidebar;
