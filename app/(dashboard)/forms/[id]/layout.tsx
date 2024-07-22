import React, { ReactNode } from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-grow flex-col mx-auto">{children}</div>
  );
}

export default layout;
