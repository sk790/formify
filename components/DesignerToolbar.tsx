import FormElementSidebar from "./FormElementSidebar";
import useDesigner from "./hooks/useDesigner";
function DesignerToolbar() {
  return (
    <aside className="w-full md:w-[280px] flex flex-col gap-2 md:border-2 border-t-2 border-muted p-4 bg-background md:rounded-xl shadow-sm overflow-y-auto overflow-x-hidden h-auto md:h-full shrink-0 items-stretch justify-start">
      <FormElementSidebar />
    </aside>
  );
}

export default DesignerToolbar;
