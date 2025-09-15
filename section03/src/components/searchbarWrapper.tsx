"use client";
import { usePathname } from "next/navigation";
import Searchbar from "./searchbar";
import { Suspense } from "react";

export default function SearchbarWrapper() {
  const pathname = usePathname();
  const show = pathname === "/" || pathname.startsWith("/search");

  if (!show) return null;

  return (
    <Suspense fallback={<div>Loading search ...</div>}>
      <Searchbar />
    </Suspense>
  );
}
