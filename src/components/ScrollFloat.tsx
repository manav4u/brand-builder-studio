import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    if (!textRef.current) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : undefined;

    const chars = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      chars,
      { willChange: "opacity, transform", opacity: 0, yPercent: 120 },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        stagger: stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          scroller: scroller,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  // If children is not a string, render it directly with animation on the container
  if (typeof children !== "string") {
    return (
      <span ref={containerRef} className={containerClassName}>
        <span ref={textRef} className={textClassName}>
          {children}
        </span>
      </span>
    );
  }

  return (
    <span ref={containerRef} className={containerClassName}>
      <span
        ref={textRef}
        className={`inline-block overflow-hidden ${textClassName}`}
      >
        {splitText}
      </span>
    </span>
  );
};

export default ScrollFloat;
