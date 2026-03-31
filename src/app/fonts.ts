import localFont from 'next/font/local'

export const manrope = localFont({
  src: [
    {
      path: '../assets/fonts/Manrope-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Manrope-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Manrope-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Manrope-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-manrope', // удобно для CSS variables
  display: 'swap',
})