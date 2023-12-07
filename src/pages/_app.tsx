// src\pages\_app.tsx

import type { AppProps } from 'next/app'
import { UserProvider } from '@/contexts/user/UserProvider'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { themeDark, themeLight } from '../themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}

