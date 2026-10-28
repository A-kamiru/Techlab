import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Scroll-reveal primitives. All animate once, and collapse to an instant, movement-free
 * fade when the visitor prefers reduced motion.
 *
 * Keep cards' own hover transforms on an inner element: framer-motion owns `transform`
 * on the wrapper it renders.
 */
const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' } as const;

function useVariants(distance = 24): { group: Variants; item: Variants } {
  const reduce = useReducedMotion();
  return {
    group: { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.02 } } },
    item: {
      hidden: { opacity: 0, y: reduce ? 0 : distance },
      show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.55, ease: EASE } },
    },
  };
}

interface Props {
  children: ReactNode;
  className?: string;
}

/** Fades/slides one block in when it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: Props & { delay?: number }) {
  const { item } = useVariants();
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its <RevealItem> children. `onLoad` animates on mount instead of on scroll. */
export function Stagger({ children, className, onLoad = false }: Props & { onLoad?: boolean }) {
  const { group } = useVariants();
  return (
    <motion.div
      className={className}
      variants={group}
      initial="hidden"
      {...(onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT })}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: Props) {
  const { item } = useVariants();
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
