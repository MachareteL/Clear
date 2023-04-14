import { Quicksand } from "next/font/google";
import React, { useState, Fragment } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Dialog, Transition } from '@headlessui/react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

const quick = Quicksand({
  subsets: ['latin'],
  weight: 'variable',
});
export default function pending({ pedidos }) {
  const [total, setTotal] = useState(0);
  const [CPF, setCPF] = useState('');
  const [qrCode, setQrCode] = useState({});
  const [erro, setErro] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const rota = useRouter();

  async function fazerPagamento(subtotal) {
    await fetch('/api/checkout/createCobranca', {
      method: 'POST',
      body: JSON.stringify({ valor_cobranca: subtotal, CPF }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((resposta) => resposta.json())
      .then((qrCode) => {
        setQrCode(qrCode);
        setIsFetched(true);
      });
  }

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal(valor) {
    setTotal(valor);
    setIsOpen(true);
  }

  function copiar() {
    navigator.clipboard.writeText(qrCode.qrcode);
  }

  function isEnough() {
    CPF.length < 13 ? setErro(true) : setErro(false);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirme seus dados
                  </Dialog.Title>
                  <div className="mt-2 grid grid-rows-4 gap-0">
                    <p className="text-sm text-gray-500">
                      Precisamos do numero do seu CPF para gerarmos o
                      QRCode/Código pix.
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Insira o número abaixo, ao clicar em enviar será
                      redirecionado à uma pagina de pagamento.
                    </p>
                    <div className="border p-2 border-gray-400 rounded-md text-gray-500 mb-4">
                      <h1>Valor total: R${total}</h1>
                    </div>
                    <TextField
                      value={CPF}
                      onChange={(e) => {
                        setCPF(() => {
                          console.log(e.target.value);
                          if (CPF.length == 2 || CPF.length == 6) {
                            if (isNaN(CPF[CPF.length - 1])) {
                              return CPF.substring(0, CPF.length - 1);
                            } else if (!isNaN(e.target.value)) {
                              return e.target.value + '.';
                            } else return CPF;
                          } else if (CPF.length == 10) {
                            console.log('sec if');
                            if (!isNaN(e.target.value.replace('.', ''))) {
                              if (isNaN(CPF[CPF.length - 1])) {
                                return CPF.substring(0, CPF.length - 1);
                              }
                              console.log(e.target.value);
                              return e.target.value + '-';
                            } else return CPF;
                          }
                          console.log('not if');
                          if (
                            !isNaN(
                              e.target.value.replace('.', '').replace('-', '')
                            )
                          ) {
                            return e.target.value;
                          } else {
                            console.log('é letra');
                            return CPF;
                          }
                        });
                      }}
                      type="text"
                      size="small"
                      label="CPF"
                      className="h-8 outline-none text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-md border border-gray-400"
                      onBlur={isEnough}
                      helperText="O CPF deve ter 14 digitos"
                      error={erro}
                    />
                  </div>
                  <img src={qrCode.imagemQrcode} alt="" className="m-auto" />
                  <p className="break-words text-xs">{qrCode.qrcode}</p>
                  <div className="mt-4 flex justify-between">
                    {Object.keys(qrCode).length > 0 && (
                      <button
                        onClick={copiar}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Copiar código Pix
                      </button>
                    )}
                    {isFetched ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={(_) => location.reload()}
                      >
                        Finalizar
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => fazerPagamento(total)}
                        disabled={CPF.length == 14 ? false : true}
                      >
                        Enviar
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className={`${quick.className} container m-auto p-4 min-h-screen`}>
        <h1 className={`text-xl tracking-tight mt-5`}>Histórico de Pedidos</h1>
        <h2 className={`text-base`}>
          Confira os seus pedidos passados abaixo.
        </h2>
        <div className="border-t-2">
          {pedidos.ID ? (
            pedidos.ID == 500 ? (
              <div className="mt-4">
                <div>{pedidos.DATA}</div>
                <div className="text-sm">
                  Verifique se está autenticado e/ou se confirmou seu pedido em
                  seu carrinho
                </div>
              </div>
            ) : (
              <></>
            )
          ) : Object.keys(pedidos).length == 0 ? (
            <div className="text-sm">
              Verifique se está autenticado e/ou se confirmou seu pedido em seu
              carrinho
            </div>
          ) : (
            pedidos.map((pedido) => (
              <div
                key={pedido.ID}
                className={`mt-5 border-gray-300 border p-4 rounded-lg`}
              >
                <div className="grid grid-cols-8 gap-2 border-b border-gray-300 items-center pb-2">
                  <div className="grid grid-rows-2 col-span-4">
                    <h1 className="font-bold">Registro do pedido </h1>{' '}
                    <p>
                      {' '}
                      {pedido.ID.slice(pedido.ID.length - 7, pedido.ID.length)}
                    </p>
                  </div>
                  <div className="grid grid-rows-2 col-span-3">
                    <h1 className="font-bold">Valor total</h1>{' '}
                    <p> R${pedido.DATA.subtotal}</p>
                  </div>
                  <EllipsisVerticalIcon className="h-5 col-span-1 justify-end cursor-pointer" />
                </div>
                <div>
                  <ul className="border-b border-gray-300 sm:grid sm:grid-cols-3">
                    {pedido.DATA.listaProdutos.map((produto) => (
                      <li key={produto.nome}>
                        <div className="grid grid-cols-10 gap-2 items-center sm:border-x sm:border-gray-300">
                          <img
                            src={produto.imagem}
                            className="col-span-3 sm:max-h-40 sm:col-span-3 place-self-center"
                          />
                          <div className="col-span-7 grid grid-rows-3">
                            <h1>{produto.nome}</h1>
                            <h2>Quantidade: {produto.qtd}</h2>
                            <h2>
                              R$
                              {produto.preco}
                            </h2>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-6 grid-rows-2 items-center">
                    <div className="pt-2 col-span-6">
                      Pedido efetuado em{' '}
                      {new Date(
                        new Timestamp(
                          pedido.DATA.criacao.seconds,
                          pedido.DATA.criacao.nanoseconds
                        ).toDate()
                      ).toLocaleDateString()}
                    </div>
                    <div className="col-span-4 align-text-bottom">
                      <ExclamationCircleIcon className="h-4 text-yellow-500 inline" />{' '}
                      {pedido.DATA.status}
                    </div>
                    <button
                      onClick={() => openModal(pedido.DATA.subtotal)}
                      className="border border-gray-300 col-span-2 rounded-md bg-indigo-600 text-white py-1"
                    >
                      Efetuar Pagamento
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const retorno = await fetch(
      'http://localhost:3000/api/firebase/firestore/getPedidos'
    );
    const pedidos = await retorno.json();
    return {
      props: { pedidos },
    };
  } catch {
    return {
      props: { pedidos: { ID: 500, DATA: 'Você não possui pedidos' } },
    };
  }
}
