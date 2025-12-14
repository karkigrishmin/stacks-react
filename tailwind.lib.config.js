/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/components/stacks/**/*.tsx',
    './src/components/ui/button.tsx',
    './src/components/ui/dialog.tsx',
    './src/components/ui/skeleton.tsx',
    './src/components/ui/badge.tsx',
    './src/components/ui/dropdown-menu.tsx',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          secondary: 'var(--foreground-secondary)',
          tertiary: 'var(--foreground-tertiary)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          elevated: 'var(--card-elevated)',
          foreground: 'var(--card-foreground)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        bitcoin: {
          DEFAULT: 'var(--bitcoin-orange)',
        },
      },
      borderRadius: {
        sm: 'var(--sk-radius-sm)',
        md: 'var(--sk-radius-md)',
        lg: 'var(--sk-radius-lg)',
        xl: 'var(--sk-radius-xl)',
        full: 'var(--sk-radius-full)',
      },
      boxShadow: {
        sm: 'var(--sk-shadow-sm)',
        md: 'var(--sk-shadow-md)',
        lg: 'var(--sk-shadow-lg)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
