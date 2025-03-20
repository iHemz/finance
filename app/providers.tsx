"use client";

import { queryClient } from "@/app/utils/reactQuery";
import { theme } from "@/theme";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
