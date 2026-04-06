import React from "react";
import { brand } from "@/config/brand";
import Image from "@/lib/image";

interface LogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
  size = 100,
  className = "",
  onClick,
}) => {
  return (
    <Image
      src="/logo.svg"
      alt={`${brand.productName} logo`}
      width={size}
      height={size}
      className={className}
      onClick={onClick}
      priority={size >= 64}
    />
  );
};

export default Logo;
