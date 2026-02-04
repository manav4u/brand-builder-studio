import React, { useEffect, useRef, Children, isValidElement, cloneElement, ReactNode } from "react";
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

// Recursively process children to wrap each character in a span
const processChildren = (children: ReactNode): ReactNode => {
  return Children.map(children, (child) => {
    // If it's a string, split into characters
    if (typeof child === "string") {
      return child.split("").map((char, index) => (
        <span className="inline-block char-animate" key={index}>
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
    
    // If it's a valid React element, recursively process its children
    if (isValidElement(child)) {
      const elementChild = child as React.ReactElement<{ children?: ReactNode; className?: string }>;
      return cloneElement(elementChild, {
        ...elementChild.props,
        children: processChildren(elementChild.props.children),
      });
    }
    
    return child;
  });
};

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
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Process children to wrap characters in spans
  const processedChildren = processChildren(children);

  useEffect(() => {
    if (!textRef.current) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : undefined;

    // Query all character spans
    const chars = textRef.current.querySelectorAll(".char-animate");

    if (chars.length === 0) return;

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

  return (
    <span ref={containerRef} className={containerClassName}>
      <span
        ref={textRef}
        className={`inline-block overflow-hidden ${textClassName}`}
      >
        {processedChildren}
      </span>
    </span>
  );
};

export default ScrollFloat;
