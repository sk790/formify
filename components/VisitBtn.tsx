"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VisitBtn({ shareLink }: { shareLink: string }) {
  const [mounted, setMounted] = useState(false);
  const shareUrl = `${window.location.origin}/submit/${shareLink}`;

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; //avoiding window not define
  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareUrl, "_blank");
      }}
    >
      Visit
    </Button>
  );
}

export default VisitBtn;
