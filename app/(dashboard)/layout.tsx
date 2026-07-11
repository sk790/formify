import Logo from "@/components/providers/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen min-w-full bg-background overflow-hidden">
      <nav className="flex justify-between items-center border-b border-border h-[60px] shrink-0 px-4 py-2">
        <Logo/>
        <div className="flex gap-4 items-center">
          <ThemeSwitcher/>
          <UserButton/>
        </div>
      </nav>
      <main className="flex w-full flex-grow overflow-hidden"> {children}</main>
    </div>
  );
}

export default Layout;
