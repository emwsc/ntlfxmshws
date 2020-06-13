import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

import { LottieIconProps } from "./types";

export const LottieIcon = ({animationData, speed = 1}: LottieIconProps) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const animation = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
    animation.setSpeed(speed);
  }, []);
  return <div ref={ref} />;
};
