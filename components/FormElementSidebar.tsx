import React from "react";
import ToolBarBtnElement from "./ToolBarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

function FormElementSidebar() {
  return (
    <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden pb-2 md:pb-0 w-full items-center">
      <ToolBarBtnElement formElement={FormElements.FormHeaderField} />
      <ToolBarBtnElement formElement={FormElements.TittleField} />
      <ToolBarBtnElement formElement={FormElements.SubTittleField} />
      <ToolBarBtnElement formElement={FormElements.ParagraphField} />
      <ToolBarBtnElement formElement={FormElements.SeparatorField} />
      <ToolBarBtnElement formElement={FormElements.SpacerField} />
      
      <Separator className="hidden md:block my-2 w-8" />

      <ToolBarBtnElement formElement={FormElements.TextField} />
      <ToolBarBtnElement formElement={FormElements.NumberField} />
      <ToolBarBtnElement formElement={FormElements.TextAreaField} />
      <ToolBarBtnElement formElement={FormElements.DateField} />
      <ToolBarBtnElement formElement={FormElements.SelectField} />
      <ToolBarBtnElement formElement={FormElements.RadioField} />
      <ToolBarBtnElement formElement={FormElements.CheckBoxField} />
      <ToolBarBtnElement formElement={FormElements.UploadField} />
      <ToolBarBtnElement formElement={FormElements.CheckboxGridField} />
      <ToolBarBtnElement formElement={FormElements.LocationField} />
      <ToolBarBtnElement formElement={FormElements.SignatureField} />
      <ToolBarBtnElement formElement={FormElements.AudioRecorderField} />
    </div>
  );
}

export default FormElementSidebar;
