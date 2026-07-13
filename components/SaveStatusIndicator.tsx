"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";
import { toast } from "./ui/use-toast";
import { UpdateFormContent } from "@/actions/form";
import { FaSpinner, FaCheck, FaCloudUploadAlt } from "react-icons/fa";

function SaveStatusIndicator({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();
  const [status, setStatus] = useState<"saved" | "unsaved" | "saving">("saved");
  
  const isInitialMount = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const updateFormContent = async (elementsToSave: any) => {
    try {
      setStatus("saving");
      const jsonElements = JSON.stringify(elementsToSave);
      await UpdateFormContent(id, jsonElements);
      setStatus("saved");
      localStorage.removeItem(`form-elements-${id}`);
    } catch (error) {
      setStatus("unsaved");
      toast({
        title: "Error",
        description: "Something went wrong while syncing form.",
        variant: "destructive",
      });
    }
  };

  const manualSave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    startTransition(() => updateFormContent(elements));
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Mark as unsaved
    setStatus("unsaved");
    
    // Save to local storage for crash protection
    localStorage.setItem(`form-elements-${id}`, JSON.stringify(elements));

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new 10 second timeout for DB sync
    timeoutRef.current = setTimeout(() => {
      startTransition(() => updateFormContent(elements));
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [elements, id]);

  // Handle beforeunload to save if leaving page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (status === "unsaved") {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. They will be saved locally, but not yet synced to the cloud.";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [status]);

  return (
    <Button
      variant={"outline"}
      className="gap-1 md:gap-2 p-1 md:px-3 h-9"
      disabled={loading || status === "saving"}
      onClick={manualSave}
    >
      {status === "saved" && (
        <>
          <FaCheck className="w-4 h-4 text-green-500" />
          <span className="hidden md:inline">Saved</span>
        </>
      )}
      {status === "unsaved" && (
        <>
          <FaCloudUploadAlt className="w-4 h-4 text-yellow-500" />
          <span className="hidden md:inline">Unsaved</span>
        </>
      )}
      {status === "saving" && (
        <>
          <FaSpinner className="w-4 h-4 animate-spin text-blue-500" />
          <span className="hidden md:inline">Saving...</span>
        </>
      )}
    </Button>
  );
}

export default SaveStatusIndicator;
