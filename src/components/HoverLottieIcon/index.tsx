import React, { useCallback, useState } from "react";
import { LottieIcon } from "../LottieIcon";

export const HoverLottieIcon = ({
  children,
  animationData,
  iconWidth,
  iconHeight,
  style = {},
}: {
  children?: React.ReactNode;
  animationData: any;
  iconWidth: string;
  iconHeight: string;
  style?: any;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={style}
      onMouseEnter={useCallback(() => setHovered(true), [])}
      onMouseLeave={useCallback(() => setHovered(false), [])}
    >
      <span className="icon">
        <LottieIcon
          animationData={animationData}
          runAnimation={hovered}
          autoplay={false}
          loop={false}
        />
      </span>
      {children}
      <style jsx>{`
        .icon {
          display: inline-block;
          width: ${iconWidth};
          height: ${iconHeight};
        }
      `}</style>
    </span>
  );
};
