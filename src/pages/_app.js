import Footer from '@/components/Footer'
import NavBar from '@/components/navBar'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { CartProvider } from '@/context/Context'
import { useRouter } from 'next/router'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const rotaLogin = router.pathname == '/login' || router.pathname == '/login/signup' ? false : true

  return (
    <CartProvider>
      <SessionProvider session={session}>
        {rotaLogin && <NavBar />}
        <Component {...pageProps} />
        {rotaLogin && <Footer />}
      </SessionProvider>
    </CartProvider>
  )
}

