import FormElementSidebar from "./FormElementSidebar";
import useDesigner from "./hooks/useDesigner";
function DesignerToolbar() {
  return (
    <aside className="w-full md:w-[64px] flex flex-col gap-2 md:border-2 border-t-2 border-muted p-2 bg-background md:rounded-xl shadow-sm overflow-y-auto overflow-x-hidden h-auto md:h-auto md:max-h-[80vh] shrink-0 items-center justify-start">
      <FormElementSidebar />
    </aside>
  );
}

export default DesignerToolbar;
