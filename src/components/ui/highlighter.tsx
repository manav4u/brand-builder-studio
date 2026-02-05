"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"

interface HighlighterProps {
  children: React.ReactNode
  isView?: boolean
  delay?: number
  /** Use signature style: cursive font, gold color, -5deg rotation */
  signature?: boolean
}

export function Highlighter({
  children,
  isView = false,
  delay = 0,
  signature = true,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useEffect(() => {
    if (!shouldShow) return

    const timeoutId = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [shouldShow, delay])

  if (signature) {
    return (
      <motion.span
        ref={elementRef}
        className="font-signature text-primary inline-block origin-center"
        style={{
          display: "inline-block",
          transform: "rotate(-5deg)",
          marginLeft: "0.1em",
          marginRight: "0.1em",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    )
  }

  return (
    <span ref={elementRef} className="inline">
      {children}
    </span>
  )
}
