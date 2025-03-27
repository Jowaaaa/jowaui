import { cn } from "../libs/utils";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  shadow?: "large" | "none"
}

export function Button({ variant = "primary", shadow = "large", className = "", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 text-white",
    danger: "bg-red-500 text-white hover:bg-red-600 text-white",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const shadows = {
    large: "shadow-lg",
    medium: "shadow-md",
    none: ""
  }

  return (
    <button className={cn("px-4 py-2 rounded", variants[variant], className, shadows[shadow])} {...props} />
  );
}
