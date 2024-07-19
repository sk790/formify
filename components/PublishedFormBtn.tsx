import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublic } from "react-icons/md";

function PublishedFormBtn() {
  return (
    <Button
      variant={"outline"}
      className="gap-2 text-white bg-gradient-to-r from-green-500 to-teal-500"
    >
      <MdOutlinePublic className="w-6 h-6" />
      Published
    </Button>
  );
}

export default PublishedFormBtn;
