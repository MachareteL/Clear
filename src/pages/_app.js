import Footer from '@/components/Footer'
import NavBar from '@/components/navBar'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { CartProvider } from '@/context/Context'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <CartProvider>
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </CartProvider>
  )
}

