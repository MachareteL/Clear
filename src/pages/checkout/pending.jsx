import { Quicksand } from '@next/font/google'
import React from 'react'

const quick = Quicksand({
  subsets: ['latin'],
  weight: 'variable'
})
export default function pending({ pedidos }) {
  
  return (
    <div className='container m-auto p-4'>
      <h1 className={`${quick.className} text-xl tracking-tight mt-5`}>Histórico de Pedidos</h1>
      <h2 className={`${quick.className} text-base`}>Confira os seus pedidos passados abaixo.</h2>
      <div className='border-t-2'>
        {pedidos.map((pedido)=>(
        <>
        <div>Pedido ID: {pedido.ID}</div>
        <div>Valor total do Pedido: {}</div>
        </>))}
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  const retorno = await fetch('http://localhost:3000/api/firebase/getPedidos')
  const pedidos = await retorno.json()
  return{
    props: { pedidos }
  }
}