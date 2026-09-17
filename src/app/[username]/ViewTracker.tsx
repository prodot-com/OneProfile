"use client";

import { useEffect, useRef } from "react";
import { incrementViewCount } from "./actions";

export function ViewTracker({ profileId }: { profileId: string }) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    
    incrementViewCount(profileId).catch(console.error);
  }, [profileId]);

  return null;
}
