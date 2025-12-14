import type { Transition, Variants } from 'framer-motion';

// Transition presets from DESIGN_SYSTEM.md
export const transitions = {
  spring: {
    snappy: { type: 'spring', stiffness: 500, damping: 30 } as Transition,
    smooth: { type: 'spring', stiffness: 300, damping: 30 } as Transition,
    gentle: { type: 'spring', stiffness: 200, damping: 25 } as Transition,
  },
  tween: {
    fast: { duration: 0.15, ease: [0.25, 1, 0.5, 1] } as Transition,
    normal: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } as Transition,
    slow: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } as Transition,
  },
} as const;

// Fade in variant
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.tween.normal },
  exit: { opacity: 0, transition: transitions.tween.fast },
};

// Slide up variant (cards, modals)
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.spring.smooth },
  exit: { opacity: 0, y: 10, transition: transitions.tween.fast },
};

// Slide down variant
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: transitions.spring.smooth },
  exit: { opacity: 0, y: -10, transition: transitions.tween.fast },
};

// Slide in from left
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: transitions.spring.smooth },
  exit: { opacity: 0, x: -10, transition: transitions.tween.fast },
};

// Slide in from right
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: transitions.spring.smooth },
  exit: { opacity: 0, x: 10, transition: transitions.tween.fast },
};

// Scale variant (buttons, popovers)
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: transitions.spring.snappy },
  exit: { opacity: 0, scale: 0.95, transition: transitions.tween.fast },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Stagger item (use with staggerContainer)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.spring.smooth },
};

// Button hover animation
export const buttonHover = {
  scale: 1.02,
  transition: transitions.spring.snappy,
};

// Button tap animation
export const buttonTap = {
  scale: 0.98,
};

// Card hover animation
export const cardHover = {
  y: -4,
  transition: transitions.spring.smooth,
};

// Modal/Dialog variant
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.tween.normal },
  exit: { opacity: 0, transition: transitions.tween.fast },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.spring.smooth,
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: transitions.tween.fast },
};

// Dropdown menu variant
export const dropdownMenu: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.spring.snappy,
  },
  exit: { opacity: 0, scale: 0.95, y: -4, transition: transitions.tween.fast },
};

// Tooltip variant
export const tooltip: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: transitions.tween.fast },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.1 } },
};
