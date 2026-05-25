"use client";

import { AnimatePresence, motion } from "framer-motion";

type FormFieldErrorProps = {
  error?: string;
};

function FormFieldError({ error }: FormFieldErrorProps) {
  return (
    <div className="min-h-5" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {error ? (
          <motion.p
            key="field-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-sm leading-5 text-destructive"
            role="alert"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export { FormFieldError };
