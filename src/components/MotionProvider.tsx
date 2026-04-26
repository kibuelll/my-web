"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * MotionProvider wraps the app with LazyMotion + domAnimation feature set.
 * This reduces the framer-motion bundle by ~50% compared to importing `motion` directly.
 * All child components should use `m` from framer-motion instead of `motion`.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
