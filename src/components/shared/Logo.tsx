import React from "react";
import { brand } from "@/config/brand";
import Image from "@/lib/image";

const LOGO_VIEWBOX_WIDTH = 960;
const LOGO_VIEWBOX_HEIGHT = 320;
const LOGO_ASPECT_RATIO = LOGO_VIEWBOX_WIDTH / LOGO_VIEWBOX_HEIGHT;

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
  const width = Math.round(size * LOGO_ASPECT_RATIO);

  return (
    <Image
      src="/logo.svg"
      alt={`${brand.productName} logo`}
      width={width}
      height={size}
      className={className}
      onClick={onClick}
      priority={size >= 64}
    />
  );
};

export default Logo;
