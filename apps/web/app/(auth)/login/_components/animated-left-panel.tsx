"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AnimatedLeftPanel() {
  return (
    <motion.div
      className="relative hidden bg-muted lg:block"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Image
        src="/img/3303484.jpg"
        width="1000"
        height="900"
        alt="Image"
        className="absolute z-10 inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        priority // Add priority since it's above the fold
      />
      <motion.div
        className="absolute z-30 flex flex-col gap-3 text-white left-20 top-1/5 backdrop-blur-[0.5px] pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="size-5 bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        />
        <h3 className="font-medium text-3xl">
          Welcome back
        </h3>
        <motion.p
          className="text-lg text-white/80 max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          We've kept everything ready for you, making it easy to access the care and benefits you need.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
