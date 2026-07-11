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
import useDesigner from "./hooks/useDesigner";
import { idGenrator } from "@/lib/idGenrator";

function ToolBarBtnElement({ formElement }: { formElement: FormElement }) {
  const { icon: Icon, label } = formElement.desinerBtnElement;
  const { addElement, elements } = useDesigner();

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  const handleAddElement = (e: React.MouseEvent) => {
    e.preventDefault();
    const newElement = formElement.construct(idGenrator());
    addElement(elements.length, newElement);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={draggable.setNodeRef}
            className={cn(
              `flex flex-col md:flex-row gap-2 w-[80px] md:w-full h-[60px] md:h-[48px] shrink-0 cursor-grab active:cursor-grabbing px-2 justify-center md:justify-start items-center bg-accent/20 md:bg-transparent md:hover:bg-accent`,
              draggable.isDragging && "ring-2 ring-primary"
            )}
            variant={"ghost"}
            onClick={handleAddElement}
            {...draggable.attributes}
            {...draggable.listeners}
          >
            <Icon className="h-6 w-6 md:h-5 md:w-5 text-primary cursor-grab" />
            <p className="text-[10px] md:text-sm whitespace-nowrap overflow-hidden text-ellipsis md:block text-muted-foreground">{label}</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="md:hidden">
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
  const { icon: Icon, label } = formElement.desinerBtnElement;
  return (
    <Button
      className={`flex flex-col md:flex-row gap-2 w-[80px] md:w-[280px] h-[60px] md:h-[48px] cursor-grab px-2 justify-center md:justify-start items-center bg-accent`}
      variant={"outline"}
    >
      <Icon className="h-6 w-6 md:h-5 md:w-5 text-primary cursor-grab" />
      <p className="text-[10px] md:text-sm whitespace-nowrap overflow-hidden text-ellipsis md:block text-muted-foreground">{label}</p>
    </Button>
  );
}

export default ToolBarBtnElement;
