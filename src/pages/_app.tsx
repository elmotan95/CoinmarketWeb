import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import React from "react";
import reactQueryClient from "../config/reactQueryClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={reactQueryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
