"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { deleteForm } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";

function DeleteForm({ formId }: { formId: number }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const DeleteFormById = async () => {
    await deleteForm(formId);
    router.refresh();
    toast({
      title: "Form Deleted",
      description: "Form has been deleted",
    });
  };
  return (
    <Button
      className="w-full"
      variant={"destructive"}
      onClick={() => startTransition(DeleteFormById)}
    >
      {pending ? <ImSpinner2 className="animate-spin h-6 w-6" /> : "Delete"}
    </Button>
  );
}

export default DeleteForm;