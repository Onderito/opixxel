"use client";

import React from "react";
import useLenis from "../hook/use-lennis";
import { ReactNode } from "react";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  useLenis();

  return <>{children}</>;
}
