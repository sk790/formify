"use client";

import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishedFormBtn from "./PublishedFormBtn";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";

function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
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
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-hidden h-[200p] bg-accent bg-[url(/rails.svg)] dark:bg-[url(/rails-dark.svg)]">
          <Designer />
        </div>
      </main>
    </DndContext>
  );
}

export default FormBuilder;
