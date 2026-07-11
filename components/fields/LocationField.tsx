"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import useDesigner from "@/components/hooks/useDesigner";
import { IoLocationOutline, IoLocateOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

// Dynamically import MapPicker with SSR disabled to prevent window is not defined error
const MapPicker = dynamic(() => import("../MapPicker"), { ssr: false });

const type: ElementsType = "LocationField";

const extraAttributes = {
  label: "Location Picker",
  helperText: "Drop a pin on the map",
  required: false,
  hasHelperText: true,
};

export const LocationFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: IoLocationOutline,
    label: "Location Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: () => null, // Properties are edited inline
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText, hasHelperText } = element.extraAttributes;
  const { selectedElement, updateElement } = useDesigner();
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

      <div className="h-[200px] w-full rounded-md border flex flex-col items-center justify-center bg-accent/20 pointer-events-none mt-2">
        <IoLocationOutline className="h-8 w-8 text-muted-foreground mb-2" />
        <span className="text-muted-foreground text-sm font-medium">Interactive Map Picker</span>
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
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isInitialLocationLoading, setIsInitialLocationLoading] = useState(!defaultValue);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  useEffect(() => {
    if (!defaultValue && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const val = JSON.stringify([position.coords.latitude, position.coords.longitude]);
          setValue(val);
          if (submitValue) {
            const valid = LocationFieldFormElement.validate(element, val);
            setError(!valid);
            if (valid) submitValue(element.id, val);
          }
          setIsInitialLocationLoading(false);
        },
        () => {
          setIsInitialLocationLoading(false);
        }
      );
    } else {
      setIsInitialLocationLoading(false);
    }
  }, [defaultValue, submitValue, element]);

  const { label, required, helperText, hasHelperText } = element.extraAttributes;
  
  let currentPos: [number, number] | null = null;
  try {
    if (value) currentPos = JSON.parse(value);
  } catch (e) {}

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const val = JSON.stringify([position.coords.latitude, position.coords.longitude]);
        setValue(val);
        if (submitValue) {
          const valid = LocationFieldFormElement.validate(element, val);
          setError(!valid);
          if (valid) submitValue(element.id, val);
        }
        setIsLoadingLocation(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      
      <div className="relative w-full">
        <Button 
          type="button"
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2 text-xs h-8 flex items-center gap-1 z-10 shadow-md bg-background/90 hover:bg-background"
          onClick={handleCurrentLocation}
          disabled={isLoadingLocation || isInitialLocationLoading}
        >
          <IoLocateOutline className="h-4 w-4" />
          {isLoadingLocation ? "Getting location..." : "Use current location"}
        </Button>
        {isInitialLocationLoading ? (
          <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-accent/20">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px] mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          <MapPicker
            position={currentPos}
            onLocationSelect={(lat, lng) => {
              const val = JSON.stringify([lat, lng]);
              setValue(val);
              if (!submitValue) return;
              const valid = LocationFieldFormElement.validate(element, val);
              setError(!valid);
              if (!valid) return;
              submitValue(element.id, val);
            }}
          />
        )}
      </div>
      
      {hasHelperText && helperText && (
        <p
          className={cn(
            "text-[0.8rem] text-muted-foreground pl-2 mt-2",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
