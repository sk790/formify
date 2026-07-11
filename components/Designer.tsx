import { idGenrator } from "@/lib/idGenrator";
import { cn } from "@/lib/utils";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import React, { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { GripHorizontal, Copy } from "lucide-react";
import DesignerToolbar from "./DesignerToolbar";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: "designer-droppable",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      console.log(event);
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      //First Case - Dropping over designer drop area
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(idGenrator());
        addElement(elements.length, newElement);
        return;
      }

      //Second Case - Dropping over designer element over the top or bottom of the element
      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf |
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(idGenrator());

        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex(
          (element) => element.id === overId,
        );
        if (overElementIndex === -1) {
          throw new Error("over element not found");
        }
        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, newElement);
        return;
      }

      //Third Case - Dropping element over element in designer
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      const draggingDesignerElementOverAnotherElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      const activeId = active.data?.current?.elementId;
      const overId = over.data?.current?.elementId;

      const activeElementIndex = elements.findIndex(
        (element) => element.id === activeId,
      );
      const overElementIndex = elements.findIndex(
        (element) => element.id === overId,
      );

      if (activeElementIndex === -1 || overElementIndex === -1) {
        throw new Error("active or over element not found");
      }
      const activeElement = { ...elements[activeElementIndex] };
      removeElement(activeId);

      let indexForNewElement = overElementIndex;

      if (isDroppingOverDesignerElementBottomHalf) {
        indexForNewElement = overElementIndex + 1;
      } else if (isDroppingOverDesignerElementTopHalf) {
        indexForNewElement = overElementIndex;
      } else {
        indexForNewElement = elements.length;
      }
      addElement(indexForNewElement, activeElement);
    },
  });
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const prevElements = React.useRef<FormElementInstance[]>([]);

  React.useEffect(() => {
    if (elements.length > prevElements.current.length) {
      const currentLast = elements[elements.length - 1];
      const prevLast = prevElements.current[prevElements.current.length - 1];
      
      if (currentLast && prevLast && currentLast.id !== prevLast.id) {
        // Element added at the very end
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (elements.length === 1 && prevElements.current.length === 0) {
        // First element added
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
    prevElements.current = elements;
  }, [elements]);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div
        className="w-full h-full flex flex-col md:flex-row justify-center md:items-stretch p-1 md:p-4 overflow-hidden"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div className="flex flex-col md:flex-row gap-4 max-w-full h-full items-stretch w-full justify-center">
          {/* Canvas */}
          <div
            ref={droppable.setNodeRef}
            className={cn(
              `bg-background w-full max-w-[920px] h-full rounded-xl flex flex-col flex-grow items-center justify-start flex-1 shadow-sm overflow-y-auto`,
              droppable.isOver && "ring-4 ring-primary",
            )}
          >
            {!droppable.isOver && elements.length === 0 && (
              <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                Drop here
              </p>
            )}
            {droppable.isOver && elements.length === 0 && (
              <div className="p-4 w-full">
                <div className="h-[120px] rounded-md bg-primary/20"></div>
              </div>
            )}
            {elements.length > 0 && (
              <div className="flex flex-col w-full gap-2 p-4">
                {elements.map((element) => (
                  <DesignerElementWrapper key={element.id} element={element} />
                ))}
                <div ref={bottomRef} className="h-1" />
              </div>
            )}
          </div>

          {/* Toolbar */}
          <div className="md:sticky md:top-4 fixed bottom-0 left-0 w-full md:w-auto m z-50">
            <DesignerToolbar />
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
    updateElement,
  } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top-half",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom-half",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
    disabled: element.type === "FormHeaderField",
  });

  const isSelected = selectedElement?.id === element.id;

  if (draggable.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <>
      <div
        ref={draggable.setNodeRef}
        {...draggable.attributes}
        className={cn(
          "relative min-h-[100px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset",
          isSelected && "ring-2 ring-primary shadow-md z-10",
        )}
        onMouseOver={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
      >
        <div
          ref={topHalf.setNodeRef}
          className={cn(
            "absolute w-full h-1/2 rounded-t-md pointer-events-none",
            topHalf.isOver && "border-t-4 border-green-500",
          )}
        ></div>
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute w-full h-1/2 bottom-0 rounded-b-md pointer-events-none"
        ></div>
        
        {element.type !== "FormHeaderField" && (
          <>
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <div
                {...draggable.listeners}
                className="cursor-grab active:cursor-grabbing hover:scale-110 transition-transform shadow-sm rounded-md pointer-events-auto"
              >
                <GripHorizontal className="h-6 w-6 text-secondary-foreground" />
              </div>
            </div>
          </>
        )}
        
        <div
          className={cn(
            "flex flex-col w-full min-h-[120px] rounded-md bg-accent/40 opacity-100",
            mouseIsOver && !isSelected && "opacity-30",
            topHalf.isOver && "border-t-4 border-green-500 rounded-md",
            bottomHalf.isOver && "border-b-4 border-red-500 rounded-md",
          )}
        >
          <div className="flex w-full flex-grow items-center px-2 md:px-4 pt-4 md:pt-6 pb-1 md:pb-2 pointer-events-none">
            <DesignerElement elementInstance={element} />
          </div>
          {isSelected && (
            <div className="flex justify-end items-center px-2 md:px-3 py-1 md:py-2 border-t border-border/50 bg-background/50 rounded-b-md gap-1 md:gap-2">
              <div className="flex items-center gap-2 md:gap-4 mr-auto">
                {element.extraAttributes?.required !== undefined && (
                  <div className="flex items-center gap-1 md:gap-2 cursor-pointer">
                    <Label className="text-xs md:text-sm font-medium cursor-pointer">
                      Required
                    </Label>
                    <Switch
                      checked={element.extraAttributes.required === true}
                      onCheckedChange={(checked) => {
                        updateElement(element.id, {
                          ...element,
                          extraAttributes: {
                            ...element.extraAttributes,
                            required: checked,
                          },
                        });
                      }}
                    />
                  </div>
                )}
                {element.extraAttributes?.hasHelperText !== undefined && (
                  <div className="flex items-center gap-1 md:gap-2 cursor-pointer">
                    <Label className="text-xs md:text-sm font-medium cursor-pointer">
                      Helper Text
                    </Label>
                    <Switch
                      checked={element.extraAttributes.hasHelperText === true}
                      onCheckedChange={(checked) => {
                        updateElement(element.id, {
                          ...element,
                          extraAttributes: {
                            ...element.extraAttributes,
                            hasHelperText: checked,
                          },
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <Button
                className="flex justify-center items-center h-7 md:h-8 rounded-md bg-secondary text-secondary-foreground shadow-sm border hover:bg-secondary/80 text-xs md:text-sm px-2 md:px-3"
                variant={"outline"}
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation();
                  const newId = idGenrator();
                  const newElement = { ...element, id: newId };
                  const index = elements.findIndex(
                    (el) => el.id === element.id,
                  );
                  addElement(index + 1, newElement);
                }}
              >
                <Copy className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Copy</span>
              </Button>
              <Button
                className="flex justify-center items-center h-7 md:h-8 rounded-md text-white shadow-sm text-xs md:text-sm px-2 md:px-3"
                variant={"destructive"}
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(element.id);
                  setSelectedElement(null);
                }}
              >
                <BiSolidTrash className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Delete</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Designer;
