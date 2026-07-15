const fs = require('fs');

let content = fs.readFileSync('components/fields/CheckBoxField.tsx', 'utf8');
content = content.replace(/CheckBoxField/g, 'SwitchField');
content = content.replace(/CheckboxFieldFormElement/g, 'SwitchFieldFormElement');
content = content.replace(/IoMdCheckbox/g, 'BsToggleOn');
content = content.replace(/Checkbox Label/g, 'Switch Label');
content = content.replace(/Checkbox Field/g, 'Switch Field');
content = content.replace(/checkbox-/g, 'switch-');
content = content.replace('import { IoMdCheckbox } from "react-icons/io";', 'import { BsToggleOn } from "react-icons/bs";');
content = content.replace('<Checkbox id={id} />', '<Switch id={id} disabled />');
content = content.replace(/<Checkbox/g, '<Switch');
fs.writeFileSync('components/fields/SwitchField.tsx', content);

let cameraContent = fs.readFileSync('components/fields/UploadField.tsx', 'utf8');
cameraContent = cameraContent.replace(/UploadField/g, 'CameraField');
cameraContent = cameraContent.replace(/UploadFieldFormElement/g, 'CameraFieldFormElement');
cameraContent = cameraContent.replace(/LuUploadCloud/g, 'FaCamera');
cameraContent = cameraContent.replace(/import \{ LuUploadCloud \} from "react-icons\/lu";/g, 'import { FaCamera } from "react-icons/fa";');
cameraContent = cameraContent.replace(/Upload Field/g, 'Camera Field');
cameraContent = cameraContent.replace(/Click to upload or drag and drop/g, 'Click to take a live photo');
cameraContent = cameraContent.replace(/type="file"/g, 'type="file" accept="image/*" capture="environment"');
fs.writeFileSync('components/fields/CameraField.tsx', cameraContent);

let formElements = fs.readFileSync('components/FormElements.tsx', 'utf8');
formElements = formElements.replace(
  'import { RadioFieldFormElement } from "./fields/RadioField";',
  'import { RadioFieldFormElement } from "./fields/RadioField";\nimport { SwitchFieldFormElement } from "./fields/SwitchField";\nimport { CameraFieldFormElement } from "./fields/CameraField";'
);
formElements = formElements.replace(
  '  | "RadioField"',
  '  | "RadioField"\n  | "SwitchField"\n  | "CameraField"'
);
formElements = formElements.replace(
  '  RadioField: RadioFieldFormElement,',
  '  RadioField: RadioFieldFormElement,\n  SwitchField: SwitchFieldFormElement,\n  CameraField: CameraFieldFormElement,'
);
fs.writeFileSync('components/FormElements.tsx', formElements);

console.log('Done');
