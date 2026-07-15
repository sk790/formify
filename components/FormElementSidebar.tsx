"use client";

import React, { useState } from "react";
import ToolBarBtnElement from "./ToolBarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const layoutElements = [
  FormElements.FormHeaderField,
  FormElements.TittleField,
  FormElements.SubTittleField,
  FormElements.ParagraphField,
  FormElements.SeparatorField,
  FormElements.SpacerField,
];

const basicFields = [
  FormElements.TextField,
  FormElements.NumberField,
  FormElements.TextAreaField,
  FormElements.SelectField,
  FormElements.RadioField,
  FormElements.CheckBoxField,
  FormElements.DateField,
  FormElements.TimeField,
  FormElements.SwitchField,
  FormElements.RatingField,
];

const advancedFields = [
  FormElements.UploadField,
  FormElements.CheckboxGridField,
  FormElements.RadioGridField,
  FormElements.LocationField,
  FormElements.SignatureField,
  FormElements.AudioRecorderField,
  FormElements.CameraField,
];

function FormElementSidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLayout = layoutElements.filter((el) =>
    el.desinerBtnElement.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBasicFields = basicFields.filter((el) =>
    el.desinerBtnElement.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdvancedFields = advancedFields.filter((el) =>
    el.desinerBtnElement.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full gap-4 h-full">
      <div className="relative px-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-9 w-full bg-accent/20"
        />
      </div>
      
      <div className="flex flex-row md:flex-col gap-6 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden pb-2 md:pb-0 w-full items-stretch flex-grow">
        {filteredLayout.length > 0 && (
          <div className="flex flex-row md:flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground px-1 uppercase tracking-wider hidden md:block">Layout</p>
            {filteredLayout.map((el) => (
              <ToolBarBtnElement key={el.type} formElement={el} />
            ))}
          </div>
        )}
        
        {filteredBasicFields.length > 0 && (
          <div className="flex flex-row md:flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground px-1 uppercase tracking-wider hidden md:block">Basic Fields</p>
            {filteredBasicFields.map((el) => (
              <ToolBarBtnElement key={el.type} formElement={el} />
            ))}
          </div>
        )}

        {filteredAdvancedFields.length > 0 && (
          <div className="flex flex-row md:flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground px-1 uppercase tracking-wider hidden md:block">Advanced Fields</p>
            {filteredAdvancedFields.map((el) => (
              <ToolBarBtnElement key={el.type} formElement={el} />
            ))}
          </div>
        )}
        
        {filteredLayout.length === 0 && filteredBasicFields.length === 0 && filteredAdvancedFields.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-4 w-full">
            No components found
          </div>
        )}
      </div>
    </div>
  );
}

export default FormElementSidebar;
