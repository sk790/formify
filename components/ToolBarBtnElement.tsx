import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={draggable.setNodeRef}
            className={cn(
              `flex flex-col gap-2 w-10 h-10 shrink-0 cursor-grab px-0 justify-center items-center`,
              draggable.isDragging && "ring-2 ring-primary"
            )}
            variant={"ghost"}
            {...draggable.attributes}
            {...draggable.listeners}
          >
            <Icon className="h-5 w-5 text-primary cursor-grab" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ToolBarBtnElementDragOverLay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { icon: Icon } = formElement.desinerBtnElement;
  return (
    <Button
      className={`flex flex-col gap-2 w-10 h-10 cursor-grab px-0 justify-center items-center`}
      variant={"outline"}
    >
      <Icon className="h-5 w-5 text-primary cursor-grab" />
    </Button>
  );
}

export default ToolBarBtnElement;
