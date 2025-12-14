// Animation duration tokens (in milliseconds)
export const duration = {
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
} as const;

// Animation easing functions
export const easing = {
  // Smooth deceleration (good for elements entering the screen)
  outExpo: [0.16, 1, 0.3, 1] as const,
  // Slightly faster deceleration
  outQuart: [0.25, 1, 0.5, 1] as const,
  // Standard ease-in-out
  inOut: [0.4, 0, 0.2, 1] as const,
  // Bouncy/spring-like (for playful interactions)
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

// CSS custom property values (for use in CSS-in-JS or style attributes)
export const cssVars = {
  duration: {
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
    slower: 'var(--duration-slower)',
  },
  easing: {
    outExpo: 'var(--ease-out-expo)',
    outQuart: 'var(--ease-out-quart)',
    inOut: 'var(--ease-in-out)',
    spring: 'var(--spring)',
  },
} as const;

// Helper to create a CSS transition string
export function createTransition(
  properties: string | string[],
  durationKey: keyof typeof duration = 'normal',
  easingKey: keyof typeof easing = 'outQuart'
): string {
  const props = Array.isArray(properties) ? properties : [properties];
  const durationMs = duration[durationKey];
  const easingValue = `cubic-bezier(${easing[easingKey].join(', ')})`;

  return props
    .map((prop) => `${prop} ${durationMs}ms ${easingValue}`)
    .join(', ');
}
