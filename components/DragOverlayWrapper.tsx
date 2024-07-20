import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { Active } from "@dnd-kit/core/dist/store";
import React, { useState } from "react";
import { ToolBarBtnElementDragOverLay } from "./ToolBarBtnElement";
import { ElementsType, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";

function DragOverlayWrapper() {
  const { elements } = useDesigner();
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

  const isDesignerElement = dragedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = dragedItem.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) return (node = <div>Element not found</div>);
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div className="flex bg-accent rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
