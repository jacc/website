"use client";

import {
  toastContainerStyles,
  toastDescriptionVariants,
  toastIconContainerVariants,
  toastTitleVariants,
  toastVariants,
  toastCloseButtonVariants,
} from "./styles";
import type { ToastFactoryComposition, ToastFactoryProps } from "./types";
import clsx from "clsx";
import { Toaster as ToasterSonner, toast as toastSonner } from "sonner";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Toaster = ({
  toastOptions,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<typeof ToasterSonner>) => (
  <ToasterSonner
    toastOptions={{
      unstyled: true,
      className: twMerge(clsx(["rounded-lg"], className)),
      ...toastOptions,
    }}
    {...rest}
  />
);

const ToastCloseButton = ({ id, intent }: { id: string; intent: string }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const isTouchScreen = mounted
    ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    : false;

  return (
    <button
      className={toastCloseButtonVariants({
        intent: intent as
          | "none"
          | "info"
          | "success"
          | "fail"
          | "warning"
          | "orange",
        isTouchScreen,
      })}
      onClick={() => toastSonner.dismiss(id)}
      aria-label="Close toast"
    >
      <X className="size-2.5" />
    </button>
  );
};

const toast: ToastFactoryProps & ToastFactoryComposition = ({
  className,
  intent = "info",
  title,
  description,
  icon,
  action,
  ...rest
}) => {
  return toastSonner.custom(
    (t) => (
      <div
        className={twMerge(clsx(toastVariants({ intent }), className))}
        tabIndex={-1}
      >
        <div className="flex w-full items-start gap-2">
          {icon ? (
            <span className={clsx(toastIconContainerVariants({ intent }))}>
              {icon}
            </span>
          ) : null}
          <div className={clsx(toastContainerStyles)}>
            {title ? (
              <div className={toastTitleVariants({ intent })}>{title}</div>
            ) : null}
            {description ? (
              typeof description === "string" ||
              typeof description === "number" ? (
                <div
                  className={toastDescriptionVariants({ intent, clip: true })}
                >
                  {description}
                </div>
              ) : (
                <div
                  className={toastDescriptionVariants({ intent, clip: false })}
                >
                  {description}
                </div>
              )
            ) : null}
          </div>
        </div>
        {action ? (
          typeof action === "object" && "label" in action ? (
            <button
              className={clsx(
                "text-sm px-3 py-1.5 rounded-md transition-colors",
                intent === "info" && "bg-blue-500 hover:bg-blue-600 text-white",
                intent === "success" &&
                  "bg-green-500 hover:bg-green-600 text-white",
                intent === "fail" && "bg-red-500 hover:bg-red-600 text-white"
              )}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ) : (
            action
          )
        ) : null}
        <ToastCloseButton
          intent={
            intent as
              | "none"
              | "info"
              | "success"
              | "fail"
              | "warning"
              | "orange"
          }
          id={t as string}
        />
      </div>
    ),
    { unstyled: true, className: "w-full focus:outline-none", ...rest }
  );
};

toast.dismiss = toastSonner.dismiss;
toast.promise = toastSonner.promise;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Toaster.displayName = "Toaster";

export { toast };
export default Toaster;
