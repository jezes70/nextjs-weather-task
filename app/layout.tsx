"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloclient";
import AuthProvider from "./api/lib/provider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
          {/* <Footer /> */}
        </body>
      </AuthProvider>
    </html>
  );
}
