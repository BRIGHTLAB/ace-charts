"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const ClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen py-5 xl:py-10 relative">{children}</div>
    </QueryClientProvider>
  );
};

export default ClientProvider;
