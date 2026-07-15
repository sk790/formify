"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveStatusIndicator from "./SaveStatusIndicator";
import PublishedFormBtn from "./PublishedFormBtn";
import Designer from "./Designer";
import CircuitBackground from "./CircuitBackground";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";
import { UpdateFormName } from "@/actions/form";
import { FormElements } from "./FormElements";

function FormBuilder({ form }: { form: Form }) {
  const { setElements, setSelectedElement } = useDesigner();
  const [formName, setFormName] = useState(form.name);

  const updateName = async (newName: string) => {
    try {
      if (newName === form.name || newName.trim() === "") {
        setFormName(form.name);
        return;
      }
      await UpdateFormName(form.id, newName);
      toast({
        title: "Success",
        description: "Form name updated",
      });
    } catch (error) {
      setFormName(form.name); // Revert on failure
      toast({
        title: "Error",
        description: "Could not update form name",
        variant: "destructive",
      });
    }
  };
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const localData = localStorage.getItem(`form-elements-${form.id}`);
    
    if (localData) {
      setElements(JSON.parse(localData));
    } else {
      const elements = JSON.parse(form.content);
      if (elements.length === 0) {
        const id = "header-" + Math.floor(Math.random() * 10000).toString();
        const newElement = FormElements.FormHeaderField.construct(id);
        setElements([newElement]);
        setSelectedElement(newElement);
      } else {
        setElements(elements);
      }
    }
  }, [form, setElements, setSelectedElement]);

  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    setShareLink(`${window.location.origin}/submit/${form.shareURL}`);
  }, [form.shareURL]);

  if (form.published) {
    return (
      <>
        <Confetti />
        <div className="flex flex-col items-center justify-center h-full w-full min-h-screen p-4 md:p-8">
          <div className="max-w-md w-full flex flex-col gap-2">
            <h1 className="text-center text-2xl md:text-4xl font-bold text-primary border-b pb-2 mb-4 md:mb-10">
              Form Published
            </h1>
            <h2 className="text-xl md:text-2xl">Share this form</h2>
            <h3 className="text-sm md:text-xl text-muted-foreground border-b pb-4 md:pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareLink} />
              <Button
                className="w-full mt-2"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  toast({
                    title: "Copied",
                    description: "Link Copied to clipboard",
                  });
                }}
              >
                Link Copy
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-4">
              <Button variant={"link"} asChild className="w-full sm:w-auto">
                <Link href={"/"} className="gap-2">
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button variant={"link"} asChild className="w-full sm:w-auto">
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full h-full overflow-hidden">
        <nav className="flex flex-col w-full shrink-0">
          <div className="flex justify-between border-b-2 p-2 md:p-4 gap-2 md:gap-3 items-center flex-col md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground truncate font-medium text-sm md:text-base">Form:</span>
              <Input
                className="w-[200px] md:w-[300px] border-transparent hover:border-input focus:border-input bg-transparent text-base md:text-lg font-medium"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                onBlur={(e) => updateName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              <PreviewDialogBtn />
              {!form.published && (
                <>
                  <SaveStatusIndicator id={form.id} />
                  <PublishedFormBtn id={form.id} />
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-hidden h-full bg-background selection:bg-indigo-500/30">
          <CircuitBackground />
          <div className="relative z-10 w-full h-full flex flex-grow items-center justify-center pointer-events-auto">
            <Designer />
          </div>
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
