import { useState } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { createEnvironment } from "./environment";

export function RelayProvider({ children }: { children: React.ReactNode }) {
  const [environment] = useState(() => {
    return createEnvironment();
  });
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
