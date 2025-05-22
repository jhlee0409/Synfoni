'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * Wraps the `next-themes` ThemeProvider to provide theme context to child components.
 *
 * Forwards all props to the underlying `NextThemesProvider` and renders the given children within the theme context.
 *
 * @param children - React nodes to be rendered within the theme context.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
