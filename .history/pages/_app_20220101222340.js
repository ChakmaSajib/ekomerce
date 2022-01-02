import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // this will call after rendering this component
    // to remove css for server side rendering 

    const jssStyle = document.querySelector('#jss-server-side')
    if (jssStyle) {
      jssStyle.parentElement.removeChild
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
