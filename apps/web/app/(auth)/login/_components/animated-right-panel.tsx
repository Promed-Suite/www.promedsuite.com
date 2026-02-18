"use client";

import { motion } from "framer-motion";

import { LoginForm } from "@/components/login-form";
import { Icons } from "@workspace/ui/components/icons";

export function AnimatedRightPanel() {
  return (
    <motion.div
      className="flex flex-col gap-4 p-6 md:p-10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex justify-center gap-2 md:justify-end"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/3 text-primary-foreground">
            <Icons.logo className="size-4" />
          </div>
          Promed Suite
        </a>
      </motion.div>
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </motion.div>
  );
}
