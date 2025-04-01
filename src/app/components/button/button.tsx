import { cn } from "../libs/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  shadow?: "large" | "medium" | "none";
  shadowColor?: string; 
  bgColor?: string;
}

export function Button({
  variant = "primary",
  shadow = "large",
  className = "",
  bgColor = "",
  shadowColor = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "text-white hover:opacity-80",
    danger: "text-white hover:opacity-80",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const shadows = {
    large: "shadow-lg",
    medium: "shadow-md",
    none: "",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded transition",
        variants[variant],
        shadows[shadow], // Still use Tailwind's shadow sizes
        className
      )}
      style={{
        backgroundColor: bgColor || undefined,
        boxShadow: shadow !== "none" && shadowColor ? `0px 4px 10px ${shadowColor}` : undefined, // ✅ Dynamic shadow color
      }}
      {...props}
    />
  );
}
