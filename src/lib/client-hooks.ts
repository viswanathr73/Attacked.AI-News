"use client";

import { useEffect, useState } from "react";

// Hook for hydration-safe date formatting
export function useClientDateTime(date: string | Date): string {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFormattedDate(
      new Date(date).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    );
  }, [date]);

  return isClient ? formattedDate : '';
}