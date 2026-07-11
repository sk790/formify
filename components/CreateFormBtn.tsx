"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";
import { useRouter } from "next/navigation";

function CreateFormBtn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onCreate() {
    try {
      setIsSubmitting(true);
      const defaultName = `Untitled Form ${Date.now()}`;
      const formId = await CreateForm({
        name: defaultName,
        description: "",
      });
      toast({
        title: "Success",
        description: "Form created successfully.",
      });
      router.push(`/builder/${formId}`);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Something went wrong while creating form.",
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      onClick={onCreate}
      disabled={isSubmitting}
      variant={"outline"}
      className="group border border-primary h-[150px] md:h-[196px] items-center justify-center flex flex-col hover:cursor-pointer border-dashed gap-4"
    >
      {isSubmitting ? (
        <ImSpinner2 className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground animate-spin" />
      ) : (
        <BsFileEarmarkPlus className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground group-hover:text-primary" />
      )}
      <p className="font-bold text-lg md:text-xl text-muted-foreground group-hover:text-primary">
        Create new form
      </p>
    </Button>
  );
}

export default CreateFormBtn;
