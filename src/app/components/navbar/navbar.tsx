import Image from "next/image"; // Import Next.js Image for optimized loading
import { cn } from "../libs/utils";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  links?: { name: string; href: string }[];
  bgColor?: string;
  shadow?: "large" | "medium" | "none";
  shadowColor?: string;
  title?: string;
  logoSrc?: string;
  logoAlt?: string; 
}

export function Navbar({
  links,
  logoSrc = "", 
  logoAlt = "Logo", 
  className = "",
  bgColor = "",
  shadowColor = "",
  shadow = "large",
  title = "MyBrand",
  ...props
}: NavbarProps) {
  const shadows = {
    large: "shadow-lg",
    medium: "shadow-md",
    none: "",
  };

  return (
    <nav
      className={cn(
        "w-full text-white p-4 flex justify-between items-center",
        className,
        shadows[shadow]
      )}
      {...props}
      style={{
        backgroundColor: bgColor || undefined,
        boxShadow: shadow !== "none" && shadowColor ? `0px 4px 10px ${shadowColor}` : undefined,
      }}
    >
      {/* Logo / Brand */}
      <div>
        {logoSrc ? (
          <Image src={logoSrc} alt={logoAlt} width={75} height={40} priority />
        ) : (
          <span className="text-lg font-bold">{title}</span> // Fallback text
        )}
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-4">
        {links?.map((link, index) => (
          <a key={index} href={link.href} className="hover:underline">
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="p-2 rounded-md bg-white text-blue-600">☰</button>
      </div>
    </nav>
  );
}
