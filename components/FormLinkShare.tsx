"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { ImShare } from "react-icons/im";

function FormLinkShare({ shareLink }: { shareLink: string }) {
  const [mounted, setMounted] = useState(false);
  const shareUrl = `${window.location.origin}/submit/${shareLink}`;

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; //avoiding window not define
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareUrl} readOnly />
      <Button
        className="w-[250px]"
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
