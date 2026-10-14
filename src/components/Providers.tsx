"use client";

import { ThemeProvider } from "@/lib/theme";
import CrmHotkey from "@/components/CrmHotkey";
import ImageGuard from "@/components/ImageGuard";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CrmHotkey />
      <ImageGuard />
      {children}
    </ThemeProvider>
  );
}
