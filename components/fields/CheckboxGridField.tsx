"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { BsUiRadiosGrid } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Separator } from "../ui/separator";

// Temporarily re-defining ElementsType here conceptually, but we will use `as ElementsType` to bypass TS until FormElements is updated.
const type = "CheckboxGridField" as ElementsType;

const extraAttributes = {
  label: "Checkbox Grid",
  helperText: "Helper text",
  required: false,
  hasHelperText: false,
  rows: ["Row 1", "Row 2", "Row 3"],
  columns: ["Column 1", "Column 2"],
};

export const CheckboxGridFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: BsUiRadiosGrid,
    label: "Tick Box Grid",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      if (!currentValue) return false;
      try {
        const parsed = JSON.parse(currentValue);
        // At least one selection in the entire grid
        return Object.values(parsed).some((arr: any) => arr.length > 0);
      } catch {
        return false;
      }
    }
    return true;
  },
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
  const { label, helperText, required, hasHelperText, rows, columns } = element.extraAttributes;
  const { updateElement, selectedElement } = useDesigner();
  const isSelected = selectedElement?.id === element.id;

  const updateProp = (key: string, value: any) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        [key]: value,
      },
    });
  };

  const updateRow = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index] = value;
    updateProp("rows", newRows);
  };
  const addRow = () => updateProp("rows", [...rows, `Row ${rows.length + 1}`]);
  const removeRow = (index: number) => {
    if (rows.length <= 1) return;
    updateProp("rows", rows.filter((_, i) => i !== index));
  };

  const updateColumn = (index: number, value: string) => {
    const newCols = [...columns];
    newCols[index] = value;
    updateProp("columns", newCols);
  };
  const addColumn = () => updateProp("columns", [...columns, `Column ${columns.length + 1}`]);
  const removeColumn = (index: number) => {
    if (columns.length <= 1) return;
    updateProp("columns", columns.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-1 w-full">
        {isSelected ? (
          <Input
            value={label}
            onChange={(e) => updateProp("label", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            placeholder="Field Label"
            className="text-base font-medium border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 rounded-sm h-auto py-1 shadow-none pointer-events-auto flex-grow"
          />
        ) : (
          <Label className="text-base font-medium">{label}</Label>
        )}
        {required && <span className="text-red-500">*</span>}
      </div>

      <div className={cn("overflow-x-auto w-full mt-2", isSelected ? "pointer-events-auto" : "pointer-events-none")}>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b bg-accent/20 w-1/3 min-w-[120px]"></th>
              {columns.map((col, idx) => (
                <th key={idx} className="p-2 border-b text-center bg-accent/20 font-medium min-w-[120px]">
                  {isSelected ? (
                    <div className="flex items-center gap-1 justify-center">
                      <Input
                        value={col}
                        onChange={(e) => updateColumn(idx, e.target.value)}
                        className="h-7 text-xs bg-background min-w-[80px]"
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="h-6 w-6 shrink-0 text-muted-foreground hover:text-red-500"
                        onClick={(e) => { e.preventDefault(); removeColumn(idx); }}
                        disabled={columns.length <= 1}
                      >
                        <AiOutlineClose className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    col
                  )}
                </th>
              ))}
              {isSelected && (
                <th className="p-2 border-b bg-accent/20 text-center font-medium min-w-[100px]">
                  <Button variant={"outline"} size={"sm"} onClick={(e) => { e.preventDefault(); addColumn(); }} className="h-7 px-2 text-xs gap-1">
                    <AiOutlinePlus className="w-3 h-3" /> Add
                  </Button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b last:border-0">
                <td className="p-2 font-medium bg-accent/10">
                  {isSelected ? (
                    <div className="flex items-center gap-1">
                      <Input
                        value={row}
                        onChange={(e) => updateRow(rIdx, e.target.value)}
                        className="h-7 text-xs font-medium bg-background min-w-[80px]"
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="h-6 w-6 shrink-0 text-muted-foreground hover:text-red-500"
                        onClick={(e) => { e.preventDefault(); removeRow(rIdx); }}
                        disabled={rows.length <= 1}
                      >
                        <AiOutlineClose className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    row
                  )}
                </td>
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="p-2 text-center pointer-events-none">
                    <Checkbox disabled={isSelected} />
                  </td>
                ))}
                {isSelected && <td></td>}
              </tr>
            ))}
            {isSelected && (
              <tr>
                <td className="p-2 bg-accent/10">
                  <Button variant={"outline"} size={"sm"} onClick={(e) => { e.preventDefault(); addRow(); }} className="h-7 px-2 text-xs gap-1">
                    <AiOutlinePlus className="w-3 h-3" /> Add Row
                  </Button>
                </td>
                <td colSpan={columns.length + (isSelected ? 1 : 0)}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasHelperText && (
        isSelected ? (
          <Input
            value={helperText}
            onChange={(e) => updateProp("helperText", e.target.value)}
            placeholder="Helper text"
            className="text-[0.8rem] rounded-sm text-muted-foreground pl-2 border-none bg-transparent hover:bg-accent/50 focus-visible:ring-0 focus-visible:bg-background focus-visible:border-b-2 h-auto py-1 shadow-none pointer-events-auto mt-2"
          />
        ) : (
          helperText && (
            <p className="text-[0.8rem] text-muted-foreground pl-2 mt-2">{helperText}</p>
          )
        )
      )}

    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValues,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValues?: string;
}) {
  const element = elementInstance as CustomInstance;
  
  // State is a record: { [rowIndex]: [colIndex1, colIndex2] } or we can store string values.
  // Using string values for better readability in submissions.
  // e.g. { "Row 1": ["Column 1", "Column 2"] }
  const [value, setValue] = useState<Record<string, string[]>>({});
  const [error, setError] = useState(false);

  const { label, helperText, required, hasHelperText, rows, columns } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  useEffect(() => {
    if (defaultValues) {
      try {
        setValue(JSON.parse(defaultValues));
      } catch (e) {
        setValue({});
      }
    }
  }, [defaultValues]);

  const toggleSelection = (row: string, col: string) => {
    const newValues = { ...value };
    if (!newValues[row]) {
      newValues[row] = [];
    }
    
    if (newValues[row].includes(col)) {
      newValues[row] = newValues[row].filter((c) => c !== col);
    } else {
      newValues[row].push(col);
    }

    setValue(newValues);
    if (submitValue) {
      const stringified = JSON.stringify(newValues);
      const valid = CheckboxGridFieldFormElement.validate(element, stringified);
      setError(!valid);
      submitValue(element.id, stringified);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> * </span>}
      </Label>

      <div className="overflow-x-auto w-full mt-2">
        <table className="w-full text-sm text-left border-collapse border border-border rounded-md">
          <thead>
            <tr>
              <th className="p-3 border-b border-r bg-accent/20 min-w-[120px]"></th>
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 border-b text-center bg-accent/20 font-medium min-w-[100px]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b last:border-0 hover:bg-accent/5 transition-colors">
                <td className="p-3 font-medium bg-accent/10 border-r">{row}</td>
                {columns.map((col, cIdx) => {
                  const isChecked = value[row]?.includes(col) || false;
                  return (
                    <td key={cIdx} className="p-3 text-center">
                      <Checkbox 
                        checked={isChecked}
                        onCheckedChange={() => toggleSelection(row, col)}
                        className={cn(error && "border-red-500")}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasHelperText && helperText && (
        <p
          className={cn(
            "text-sm text-muted-foreground pl-2 mt-2",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
