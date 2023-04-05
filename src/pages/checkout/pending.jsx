import { Quicksand } from '@next/font/google'
import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const quick = Quicksand({
  subsets: ['latin'],
  weight: 'variable'
})
export default function pending({ pedidos }) {
  // pedidos.map((pedido) => console.log(pedido.DATA))
  let criacaoProduto  = (data) => {
    const date = new Date(data)
    console.log(date);
    return `${date.toLocaleDateString} - ${date.toLocaleTimeString}`
  }
  return (
    <div className='container m-auto p-4'>
      <h1 className={`${quick.className} text-xl tracking-tight mt-5`}>Histórico de Pedidos</h1>
      <h2 className={`${quick.className} text-base`}>Confira os seus pedidos passados abaixo.</h2>
      <div className='border-t-2'>

        {pedidos.map((pedido) => (
          <div className={`${quick.className} mt-5 border-gray-300 border p-4 rounded-lg`}>
            <div className='grid grid-cols-8 gap-2 border-b border-gray-300 items-center pb-2'>
              <div className='grid grid-rows-2 col-span-4'><h1 className='font-bold'>Registro do pedido </h1> <p> {pedido.ID.slice(pedido.ID.length - 7, pedido.ID.length)}</p></div>
              <div className='grid grid-rows-2 col-span-3'><h1 className='font-bold'>Valor total</h1> <p> R${pedido.DATA.subtotal}</p></div>
              <EllipsisVerticalIcon className='h-5 col-span-1 justify-end cursor-pointer' />
            </div>
            <div>
              <ul className='border-b border-gray-300'>
                {pedido.DATA.listaProdutos.map((produto) => (
                  <li>
                    <div className='grid grid-cols-10 gap-2 items-center'>
                      <img src={produto.imagem} className='col-span-3' />
                      <div className='col-span-7 grid grid-rows-2'>
                        <h1>{produto.nome}</h1>
                        <h2>R${produto.preco}</h2>
                      </div>

                    </div>
                  </li>
                ))}
              </ul>
              <h1>{()=>(criacaoProduto(pedido.DATA.criacao.seconds))}</h1>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const retorno = await fetch('http://localhost:3000/api/firebase/firestore/getPedidos')
  const pedidos = await retorno.json()
  return {
    props: { pedidos }
  }
}