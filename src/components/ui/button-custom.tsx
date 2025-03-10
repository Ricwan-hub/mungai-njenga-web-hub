
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-primary-foreground hover:opacity-90": variant === "primary",
            "bg-secondary text-secondary-foreground hover:opacity-90": variant === "secondary",
            "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "underline-offset-4 hover:underline text-primary": variant === "link",
            "h-9 px-5 text-xs": size === "sm",
            "h-11 px-6 py-2": size === "md",
            "h-14 px-8 text-base": size === "lg",
            "w-full": fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom };
