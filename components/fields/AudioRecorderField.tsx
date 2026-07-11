"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import useDesigner from "@/components/hooks/useDesigner";
import { FaMicrophone, FaStop, FaTrash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const type: ElementsType = "AudioRecorderField";

const extraAttributes = {
  label: "Voice Note",
  helperText: "Record an audio message",
  required: false,
  hasHelperText: true,
};

export const AudioRecorderFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  desinerBtnElement: {
    icon: FaMicrophone,
    label: "Audio Recorder",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: () => null, // Inline properties
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

      <div className="h-[120px] w-full rounded-md border flex flex-col items-center justify-center bg-accent/20 pointer-events-none mt-2">
        <FaMicrophone className="h-8 w-8 text-muted-foreground mb-2" />
        <span className="text-muted-foreground text-sm font-medium">Audio Recorder (Preview)</span>
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

  // Recorder states
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [audioURL, setAudioURL] = useState<string>(defaultValue || "");
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, helperText, hasHelperText } = element.extraAttributes;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await uploadAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone permissions to record audio.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const uploadAudio = async (blob: Blob) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      // Generate a unique filename
      const file = new File([blob], `audio-${Date.now()}.webm`, { type: "audio/webm" });
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      const secureUrl = data.secure_url;

      setAudioURL(secureUrl);
      setValue(secureUrl);

      if (submitValue) {
        const valid = AudioRecorderFieldFormElement.validate(element, secureUrl);
        setError(!valid);
        submitValue(element.id, secureUrl);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Upload Failed",
        description: "Failed to upload audio file. Please try again.",
        variant: "destructive",
      });
      setError(true);
    } finally {
      setIsUploading(false);
    }
  };

  const clearAudio = () => {
    setAudioURL("");
    setValue("");
    setRecordingTime(0);
    if (submitValue) {
      submitValue(element.id, "");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      
      <div className={cn("flex flex-col gap-3 p-4 rounded-md border", error && "border-red-500", isRecording && "border-red-500 bg-red-500/5")}>
        {!audioURL && !isUploading && (
          <div className="flex items-center justify-between">
            {isRecording ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 ml-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="font-medium text-red-500">{formatTime(recordingTime)}</span>
                </div>
                <Button variant="destructive" size="sm" onClick={stopRecording} className="gap-2">
                  <FaStop /> Stop
                </Button>
              </>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">Click to start recording voice note</span>
                <Button variant="outline" size="sm" onClick={(e) => { e.preventDefault(); startRecording(); }} className="gap-2">
                  <FaMicrophone /> Record
                </Button>
              </>
            )}
          </div>
        )}

        {isUploading && (
          <div className="flex items-center justify-center gap-2 py-2">
            <Loader2 className="animate-spin text-muted-foreground h-5 w-5" />
            <span className="text-sm text-muted-foreground">Uploading audio...</span>
          </div>
        )}

        {audioURL && !isUploading && (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <audio controls src={audioURL} className="w-full h-10" />
            <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); clearAudio(); }} className="shrink-0 text-muted-foreground hover:text-red-500">
              <FaTrash />
            </Button>
          </div>
        )}
      </div>
      
      {hasHelperText && helperText && (
        <p className={cn("text-[0.8rem] text-muted-foreground pl-2", error && "text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
