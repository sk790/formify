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
import { UploadFieldFormElement } from "./fields/UploadField";
import { CheckboxGridFieldFormElement } from "./fields/CheckboxGridField";
import { RadioGridFieldFormElement } from "./fields/RadioGridField";
import { TimeFieldFormElement } from "./fields/TimeField";
import { LocationFieldFormElement } from "./fields/LocationField";
import { SignatureFieldFormElement } from "./fields/SignatureField";
import { AudioRecorderFieldFormElement } from "./fields/AudioRecorderField";
import { FormHeaderFieldFormElement } from "./fields/FormHeaderField";
import { RadioFieldFormElement } from "./fields/RadioField";
import { SwitchFieldFormElement } from "./fields/SwitchField";
import { CameraFieldFormElement } from "./fields/CameraField";
import { RatingFieldFormElement } from "./fields/RatingField";
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
  | "CheckBoxField"
  | "UploadField"
  | "CheckboxGridField"
  | "LocationField"
  | "SignatureField"
  | "AudioRecorderField"
  | "FormHeaderField"
  | "RadioField"
  | "SwitchField"
  | "CameraField"
  | "RatingField"
  | "RadioGridField"
  | "TimeField";
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
  propertiesComponent?: React.FC<{
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
  UploadField: UploadFieldFormElement,
  CheckboxGridField: CheckboxGridFieldFormElement,
  LocationField: LocationFieldFormElement,
  SignatureField: SignatureFieldFormElement,
  AudioRecorderField: AudioRecorderFieldFormElement,
  FormHeaderField: FormHeaderFieldFormElement,
  RadioField: RadioFieldFormElement,
  SwitchField: SwitchFieldFormElement,
  CameraField: CameraFieldFormElement,
  RatingField: RatingFieldFormElement,
  RadioGridField: RadioGridFieldFormElement,
  TimeField: TimeFieldFormElement,
};
