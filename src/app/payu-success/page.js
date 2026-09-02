"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PayUSuccess() {
  return (
    <main className="section flex py-12 items-center justify-center bg-gradient-to-br from-emerald-50 via-background to-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-8 md:p-12 text-center">
          {/* Soft Glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-200/40 via-transparent to-transparent blur-2xl" />

          {/* Success Icon */}
          <div className="relative flex justify-center mb-6">
            {/* Pulse Ring */}
            <span className="absolute inline-flex h-20 w-20 rounded-full bg-emerald-400 opacity-30 animate-ping" />

            {/* Icon */}
            <div className="relative rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-14 w-14 text-emerald-600" />
            </div>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Payment Successful 🎉
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
          >
            Your payment has been completed successfully. You’ll receive a
            confirmation email shortly.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-blue-500"
              >
                Back to Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="btn">Go to Dashboard</Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
