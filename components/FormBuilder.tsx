import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishedFormBtn from "./PublishedFormBtn";

function FormBuilder({ form }: { form: Form }) {
  return (
    <nav className="flex flex-col w-full">
      <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          {form.name}
        </h2>
        <div className="flex gap-2 items-center">
          <PreviewDialogBtn />
          {!form.published && (
            <>
              <SaveFormBtn />
              <PublishedFormBtn />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default FormBuilder;