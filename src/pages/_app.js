import Footer from '@/components/Footer'
import NavBar from '@/components/navBar'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { createContext } from 'react'

export const CarrinhoContext = createContext()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <CarrinhoContext.Provider value='Lucas'>
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </CarrinhoContext.Provider>
  )
}

