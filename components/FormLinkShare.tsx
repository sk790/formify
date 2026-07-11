"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { ImShare } from "react-icons/im";

function FormLinkShare({ shareLink }: { shareLink: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; //avoiding window not define

  const shareUrl = `${window.location.origin}/submit/${shareLink}`;
  return (
    <div className="flex flex-col md:flex-row flex-grow gap-2 md:gap-4 items-center w-full">
      <Input value={shareUrl} readOnly className="w-full" />
      <Button
        className="w-full md:w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Copied!",
            description: "Link copied to clipboard",
          });
        }}
      >
        <ImShare className="w-6 h-6 gap-2" />
        Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;
