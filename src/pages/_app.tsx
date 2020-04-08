// TODO Find a way to import this only where needed (i.e. DataGrid component)
import 'handsontable/dist/handsontable.full.css'

import { CSSReset, DarkMode, ThemeProvider } from '@chakra-ui/core'
import { APP_NAME } from 'lib/constants'
import { theme } from 'lib/theme'
import localforage from 'localforage'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'

// TODO disasbled color mode toggle because chakra stores the flag in localStorage
// which means `_app.tsx` doesn't know which mode to pre-render in. Not sure what
// the workaround is, but it was causing errors on the frontend so disabled for now.

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Intialize localforage for this page (on first render)
  useEffect(() => {
    localforage.createInstance({
      name: APP_NAME,
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      {/* <ColorModeProvider> */}
      <DarkMode>
        <Component {...pageProps} />
      </DarkMode>
      {/* </ColorModeProvider> */}

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next {
          height: 100%;
        }
      `}</style>
    </ThemeProvider>
  )
}

export default MyApp
