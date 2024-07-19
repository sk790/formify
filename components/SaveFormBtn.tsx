import React from "react";
import { Button } from "./ui/button";
import { HiSave } from "react-icons/hi";

function SaveFormBtn() {
  return (
    <Button variant={"outline"} className="gap-2">
      <HiSave className="w-6 h-6" /> Save
    </Button>
  );
}

export default SaveFormBtn;
