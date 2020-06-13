import React, { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";

import { LottieIconProps } from "./types";

export const LottieIcon = ({
  animationData,
  speed = 1,
  runAnimation,
  autoplay = true,
  loop = true,
}: LottieIconProps) => {
  const [animation, setAnimation] = useState<AnimationItem | null>(null);
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const animation = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop,
      autoplay,
      animationData,
    });
    setAnimation(animation);
    animation.setSpeed(speed);
  }, []);

  useEffect(() => {
    if (!animation || runAnimation === undefined) {
      return;
    }
    if (runAnimation) {
      animation.play();
    } else {
      animation.stop();
    }
  }, [runAnimation, animation]);
  return <span ref={ref} />;
};
