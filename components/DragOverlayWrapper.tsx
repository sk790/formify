import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { Active } from "@dnd-kit/core/dist/store";
import React, { useState } from "react";
import { ToolBarBtnElementDragOverLay } from "./ToolBarBtnElement";
import { ElementsType, FormElements } from "./FormElements";

function DragOverlayWrapper() {
  const [dragedItem, setDragedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDragedItem(event.active);
    },
    onDragCancel: (event) => {
      setDragedItem(null);
    },
    onDragEnd: (event) => {
      setDragedItem(null);
    },
  });

  let node = <div>No drag</div>;
  if (!dragedItem) return null;

  const isSidebarBtnElement = dragedItem.data?.current?.isDesignerBtnElement;
  const type = dragedItem.data?.current?.type as ElementsType;

  if (isSidebarBtnElement) {
    node = <ToolBarBtnElementDragOverLay formElement={FormElements[type]} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
