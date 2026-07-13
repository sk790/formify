import React, { startTransition, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { MdOutlinePublic } from "react-icons/md";
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
import { FaIcons, FaSpinner } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { PublishForm, GetFormById } from "@/actions/form";
import { useRouter } from "next/navigation";
import { FormElementInstance, FormElements } from "./FormElements";

function PublishedFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cloudElements, setCloudElements] = useState<FormElementInstance[]>([]);
  const router = useRouter();
  
  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Form published successfully.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while publishing form.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (isOpen) {
      setIsFetching(true);
      GetFormById(id).then((form) => {
        if (form && form.content) {
          try {
            setCloudElements(JSON.parse(form.content));
          } catch (e) {
            console.error("Failed to parse cloud form content");
          }
        }
        setIsFetching(false);
      });
    }
  }, [isOpen, id]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="text-white bg-gradient-to-r from-green-500 to-teal-500 gap-1 md:gap-2 p-1 md:px-3 h-9"
        >
          <MdOutlinePublic className="w-4 h-4" />
          <span className="hidden md:inline">Publish</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95vw] md:max-w-[800px] h-[90vh] md:max-h-[80vh] flex flex-col p-4 md:p-6">
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Form</AlertDialogTitle>
          <AlertDialogDescription>
            Please review your cloud-saved form below. Once published, anyone with the link can view and submit this form. Note: Any unsaved local changes will not be published.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {/* Form Preview Area */}
        <div className="bg-accent flex flex-col flex-grow items-center justify-start overflow-y-auto p-2 md:p-4 rounded-md border mt-2 mb-4 relative">
          {isFetching ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <FaSpinner className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : null}
          <div className="flex flex-col max-w-[620px] gap-4 bg-background h-fit w-full rounded-md p-4 shadow-sm border">
            {cloudElements.length > 0 ? (
              cloudElements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;
                return (
                  <FormComponent key={element.id} elementInstance={element} />
                );
              })
            ) : (
              <p className="text-center text-muted-foreground my-4">Form is empty on cloud</p>
            )}
          </div>
        </div>

        <AlertDialogFooter className="mt-auto">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading || isFetching}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Confirm & Publish {loading && <FaIcons className="ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishedFormBtn;
