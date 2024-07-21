import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSave } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { toast } from "./ui/use-toast";
import { UpdateFormContent } from "@/actions/form";
import { FaSpinner } from "react-icons/fa";

function SaveFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();
  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      console.log(jsonElements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Form saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while saving form.",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      <HiSave className="w-6 h-6" />
      Save
      {loading && <FaSpinner className="w-6 h-6 animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;
