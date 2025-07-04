/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#a78bfa', // violet-400
        'primary-50': '#f5f3ff', // violet-50
        'primary-100': '#ede9fe', // violet-100
        'primary-200': '#ddd6fe', // violet-200
        'primary-300': '#c4b5fd', // violet-300
        'primary-400': '#a78bfa', // violet-400
        'primary-500': '#8b5cf6', // violet-500
        'primary-600': '#7c3aed', // violet-600
        'primary-700': '#6d28d9', // violet-700
        'primary-800': '#5b21b6', // violet-800
        'primary-900': '#4c1d95', // violet-900
        'primary-foreground': '#ffffff', // white

        // Secondary Colors
        'secondary': '#fbcfe8', // pink-200
        'secondary-50': '#fdf2f8', // pink-50
        'secondary-100': '#fce7f3', // pink-100
        'secondary-200': '#fbcfe8', // pink-200
        'secondary-300': '#f9a8d4', // pink-300
        'secondary-400': '#f472b6', // pink-400
        'secondary-500': '#ec4899', // pink-500
        'secondary-600': '#db2777', // pink-600
        'secondary-700': '#be185d', // pink-700
        'secondary-800': '#9d174d', // pink-800
        'secondary-900': '#831843', // pink-900
        'secondary-foreground': '#1f2937', // gray-800

        // Accent Colors
        'accent': '#e0e7ff', // indigo-100
        'accent-50': '#eef2ff', // indigo-50
        'accent-100': '#e0e7ff', // indigo-100
        'accent-200': '#c7d2fe', // indigo-200
        'accent-300': '#a5b4fc', // indigo-300
        'accent-400': '#818cf8', // indigo-400
        'accent-500': '#6366f1', // indigo-500
        'accent-600': '#4f46e5', // indigo-600
        'accent-700': '#4338ca', // indigo-700
        'accent-800': '#3730a3', // indigo-800
        'accent-900': '#312e81', // indigo-900
        'accent-foreground': '#1f2937', // gray-800

        // Background Colors
        'background': '#f9fafb', // gray-50
        'background-secondary': '#f3f4f6', // gray-100
        'background-tertiary': '#e5e7eb', // gray-200

        // Surface Colors
        'surface': '#ffffff', // white
        'surface-secondary': '#f8fafc', // slate-50
        'surface-tertiary': '#f1f5f9', // slate-100

        // Text Colors
        'text-primary': '#1f2937', // gray-800
        'text-secondary': '#6b7280', // gray-500
        'text-tertiary': '#9ca3af', // gray-400
        'text-inverse': '#ffffff', // white

        // Status Colors
        'success': '#10b981', // emerald-500
        'success-50': '#ecfdf5', // emerald-50
        'success-100': '#d1fae5', // emerald-100
        'success-200': '#a7f3d0', // emerald-200
        'success-300': '#6ee7b7', // emerald-300
        'success-400': '#34d399', // emerald-400
        'success-500': '#10b981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-700': '#047857', // emerald-700
        'success-800': '#065f46', // emerald-800
        'success-900': '#064e3b', // emerald-900
        'success-foreground': '#ffffff', // white

        'warning': '#f59e0b', // amber-500
        'warning-50': '#fffbeb', // amber-50
        'warning-100': '#fef3c7', // amber-100
        'warning-200': '#fde68a', // amber-200
        'warning-300': '#fcd34d', // amber-300
        'warning-400': '#fbbf24', // amber-400
        'warning-500': '#f59e0b', // amber-500
        'warning-600': '#d97706', // amber-600
        'warning-700': '#b45309', // amber-700
        'warning-800': '#92400e', // amber-800
        'warning-900': '#78350f', // amber-900
        'warning-foreground': '#ffffff', // white

        'error': '#ef4444', // red-500
        'error-50': '#fef2f2', // red-50
        'error-100': '#fee2e2', // red-100
        'error-200': '#fecaca', // red-200
        'error-300': '#fca5a5', // red-300
        'error-400': '#f87171', // red-400
        'error-500': '#ef4444', // red-500
        'error-600': '#dc2626', // red-600
        'error-700': '#b91c1c', // red-700
        'error-800': '#991b1b', // red-800
        'error-900': '#7f1d1d', // red-900
        'error-foreground': '#ffffff', // white

        // Border Colors
        'border': '#e5e7eb', // gray-200
        'border-secondary': '#d1d5db', // gray-300
        'border-tertiary': '#9ca3af', // gray-400
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'squircle': '1.25rem',
        'full': '9999px',
      },
      boxShadow: {
        'glass-primary': '0 8px 32px rgba(167, 139, 250, 0.12)',
        'glass-secondary': '0 4px 16px rgba(167, 139, 250, 0.08)',
        'glass-soft': '0 2px 8px rgba(167, 139, 250, 0.06)',
        'neumorphic': '8px 8px 16px rgba(167, 139, 250, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'glow': '0 0 20px rgba(167, 139, 250, 0.3)',
        'glow-lg': '0 0 40px rgba(167, 139, 250, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out',
        'comet': 'comet 1.5s ease-out',
        'morph': 'morph 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(167, 139, 250, 0.2)' },
          'to': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
        sparkle: {
          '0%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
          '100%': { opacity: '0', transform: 'scale(0) rotate(360deg)' },
        },
        comet: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        morph: {
          '0%, 100%': { borderRadius: '1.25rem' },
          '50%': { borderRadius: '50%' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeOut: {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        slideInRight: {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          'from': { transform: 'translateX(0)', opacity: '1' },
          'to': { transform: 'translateX(100%)', opacity: '0' },
        },
        scaleIn: {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          'from': { transform: 'scale(1)', opacity: '1' },
          'to': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
}