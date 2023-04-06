import { Quicksand } from '@next/font/google'
import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

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

        {pedidos.map((pedido) => (
          <div key={pedido.ID} className={`${quick.className} mt-5 border-gray-300 border p-4 rounded-lg`}>
            <div className='grid grid-cols-8 gap-2 border-b border-gray-300 items-center pb-2'>
              <div className='grid grid-rows-2 col-span-4'><h1 className='font-bold'>Registro do pedido </h1> <p> {pedido.ID.slice(pedido.ID.length - 7, pedido.ID.length)}</p></div>
              <div className='grid grid-rows-2 col-span-3'><h1 className='font-bold'>Valor total</h1> <p> R${pedido.DATA.subtotal}</p></div>
              <EllipsisVerticalIcon className='h-5 col-span-1 justify-end cursor-pointer' />
            </div>
            <div>
              <ul className='border-b border-gray-300'>
                {pedido.DATA.listaProdutos.map((produto) => (
                  <li key={produto.nome}>
                    <div className='grid grid-cols-10 gap-2 items-center'>
                      <img src={produto.imagem} className='col-span-3 sm:max-h-40 sm:col-span-1 place-self-center' />
                      <div className='col-span-7 grid grid-rows-3'>
                        <h1>{produto.nome}</h1>
                        <h2>Quantidade: {produto.qtd}</h2>
                        <h2>R${produto.preco}</h2>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='grid grid-cols-6 grid-rows-2'>
                <h1 className='pt-2 col-span-6'>Pedido efetuado em {new Date(new Timestamp(pedido.DATA.criacao.seconds, pedido.DATA.criacao.nanoseconds).toDate()).toLocaleString()}</h1>
                <p className='col-span-4 align-text-bottom'><ExclamationCircleIcon className='h-4 text-yellow-500 inline'/> Pagamento Pendente</p>
                <button className='border border-gray-300 col-span-2 rounded-md bg-indigo-600 text-white py-1'>Efetuar Pagamento</button>
              </div>
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