import React from "react";
import { TextFieldFormElement } from "./fields/TextField";
import { TittleFieldFormElement } from "./fields/TittleField";
import { SubTittleFieldFormElement } from "./fields/SubTittleField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { SpacerFieldFormElement } from "./fields/SpaceField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { TextAreaFieldFormElement } from "./fields/TextAreaField";
import { DateFieldFormElement } from "./fields/DateField";
import { SelectFieldFormElement } from "./fields/SelectField";
import { CheckboxFieldFormElement } from "./fields/CheckBoxField";

export type ElementsType =
  | "TextField"
  | "TittleField"
  | "SubTittleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckBoxField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;
  desinerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValues?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TittleField: TittleFieldFormElement,
  SubTittleField: SubTittleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckBoxField: CheckboxFieldFormElement,
};
