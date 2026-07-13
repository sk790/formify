import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPageClient from "@/components/LandingPageClient";

export default function LandingPage() {
  const { userId } = auth();

  // If user is already logged in, redirect to the dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return <LandingPageClient />;
}
