"use client";

import type { icons, LucideProps } from "lucide-react";

import dynamic from "next/dynamic";

// Create dynamic import for icons
// const iconComponents: Record<string, ComponentType<LucideProps>> = {};

export function IconProps({
  name,
  ...props
}: LucideProps & { name: keyof typeof icons }) {
  const LucideIcon = dynamic(() =>
    import("lucide-react").then(mod => mod[name]),
  );

  return <LucideIcon {...props} />;
}
