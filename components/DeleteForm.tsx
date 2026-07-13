"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { deleteForm } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

function DeleteForm({ formId }: { formId: number }) {
  const [pending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const DeleteFormById = async () => {
    try {
      await deleteForm(formId);
      toast({
        title: "Form Deleted",
        description: "Form has been deleted",
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete form",
        variant: "destructive",
      });
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="" variant={"destructive"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Form</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this form you will lose all of your form submissions data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={(e) => {
              e.preventDefault();
              startTransition(DeleteFormById);
            }}
          >
            Confirm {pending && <ImSpinner2 className="ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteForm;
