import React from "react";
import { GetFormContentByUrl } from "../../../actions/form";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import { FormElementInstance } from "@/components/FormElements";

async function SubmitePage({ params }: { params: { formUrl: string } }) {
  const form = await GetFormContentByUrl(params.formUrl);
  if (!form) {
    throw new Error("form not found!");
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent formContent={formContent} formUrl={params.formUrl} />
  );
}

export default SubmitePage;
