import '../styles/globals.css'

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
  return <Component {...pageProps} />
}

export default MyApp
