import React from "react";
import ToolBarBtnElement from "./ToolBarBtnElement";
import { FormElements } from "./FormElements";

function DesignerToolbar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      <ToolBarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
}

export default DesignerToolbar;
