import FormElementSidebar from "./FormElementSidebar";
import useDesigner from "./hooks/useDesigner";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

function DesignerToolbar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className="w-[220px] md:w-[540px] max-w-[500px] flex flex-col flex-grow gap-2 border-l-2 border-muted md:p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerToolbar;
