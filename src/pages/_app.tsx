import { CSSReset, DarkMode, ThemeProvider } from '@chakra-ui/core'

import { AppProps } from 'next/app'
import React from 'react'
import { theme } from 'lib/theme'

// TODO disasbled color mode toggle because chakra stores the flag in localStorage
// which means `_app.tsx` doesn't know which mode to pre-render in. Not sure what
// the workaround is, but it was causing errors on the frontend so disabled for now.

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    {/* <ColorModeProvider> */}
    <DarkMode>
      <Component {...pageProps} />
    </DarkMode>
    {/* </ColorModeProvider> */}
  </ThemeProvider>
)

export default MyApp
