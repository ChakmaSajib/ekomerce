import React, { useEffect } from "react"
import '../styles/globals.css'
import { StoreProvider } from '../utils/store'
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // this will call after rendering this component
    // to remove css for server side rendering 
    // to fix the issue with server-side with material-ui

    const jssStyle = document.querySelector('#jss-server-side')
    if (jssStyle) {
      jssStyle.parentElement.removeChild(jssStyle)
    }
  }, [])
  return (<SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  </SnackbarProvider>)
}

export default MyApp
