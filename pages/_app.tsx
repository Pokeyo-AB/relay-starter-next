import { RelayProvider } from "@/lib/relay";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RelayProvider>
      <Suspense fallback="">
        <Component {...pageProps} />
      </Suspense>
    </RelayProvider>
  );
}
