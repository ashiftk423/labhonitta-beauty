"use client";

import { ThemeProvider } from "@/lib/theme";
import CrmHotkey from "@/components/CrmHotkey";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CrmHotkey />
      {children}
    </ThemeProvider>
  );
}
