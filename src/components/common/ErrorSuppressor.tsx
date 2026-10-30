"use client";

import { useEffect } from "react";

// Safe suppression for known upstream React 19 / Drei unmount warnings
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Attempted to synchronously unmount a root while React was already rendering")
    ) {
      return;
    }
    originalError(...args);
  };
}

export function ErrorSuppressor() {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Attempted to synchronously unmount a root while React was already rendering")
      ) {
        return;
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}

