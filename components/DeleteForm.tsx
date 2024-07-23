"use client";
import React, { useTransition } from "react";
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="" variant={"destructive"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Form</AlertDialogTitle>
          <AlertDialogDescription>
            If you are deleted this form you lose your form submissions data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(DeleteFormById)}>
            Confirm{pending && <ImSpinner2 className="ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteForm;
