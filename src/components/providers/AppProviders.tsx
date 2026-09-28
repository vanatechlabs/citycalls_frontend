"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import { BookingProvider } from "@/context/BookingContext";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReactLenis root>
      <QueryClientProvider client={queryClient}>
        <BookingProvider>
          <Toaster richColors expand={true} />
          {children}
        </BookingProvider>
      </QueryClientProvider>
    </ReactLenis>
  );
}
