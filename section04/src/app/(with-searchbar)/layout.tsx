import { ReactNode } from "react";
import SearchbarWrapper from "@/components/searchbarWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SearchbarWrapper />
      {children}
    </div>
  );
}
