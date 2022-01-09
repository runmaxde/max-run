import "../styles/globals.css"
import { useEffect } from "react"
import axios from "axios"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const pathname = window.location.pathname
    axios.post("/api/clicks", { params: { pathname } })
  }, [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
