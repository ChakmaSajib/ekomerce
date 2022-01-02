import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // this will call after rendering this component
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
