"use client";
import exportToExcel from "@/lib/exportToExcel";
import React from "react";
import { BsFiletypeXls } from "react-icons/bs";

interface Data {
  [key: string]: string | number;
}

function ExportToExcel({ data, fileName }: { data: Data[]; fileName: string }) {
  const handleExport = () => {
    exportToExcel(data, fileName);
  };
  return (
    <div>
      <h1
        className="font-bold flex items-center hover:cursor-pointer"
        onClick={handleExport}
      >
        <BsFiletypeXls /> Export
      </h1>
    </div>
  );
}

export default ExportToExcel;
