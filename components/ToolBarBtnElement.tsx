import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

function ToolBarBtnElement({ formElement }: { formElement: FormElement }) {
  const { icon: Icon, label } = formElement.desinerBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        `flex flex-col gap-2 w-[120px] h-[120px] cursor-grab`,
        draggable.isDragging && "ring-2 ring-primary"
      )}
      variant={"outline"}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-sm">{label}</p>
    </Button>
  );
}

export function ToolBarBtnElementDragOverLay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { icon: Icon, label } = formElement.desinerBtnElement;
  return (
    <Button
      className={`flex flex-col gap-2 w-[120px] h-[120px] cursor-grab`}
      variant={"outline"}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-sm">{label}</p>
    </Button>
  );
}

export default ToolBarBtnElement;
