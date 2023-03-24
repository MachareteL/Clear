import { Fragment, useState, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import Swal from 'sweetalert2';
import { CartContext, RemoveCartContext, AddCartContext } from '@/context/Context';

// see https://stackoverflow.com/questions/65523588/react-cart-with-context-and-localstorage 


export default function Carrinho({ abrido, desabrido }) {

  const [carrinho, setCarrinho] = useState([])

  const items = useContext(CartContext);
  const removeItem = useContext(RemoveCartContext);
  const [cartTotal, setCartTotal] = useState(0);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);


  const total = () => {
    let acumulador = 0
        items.forEach((element) => {
            acumulador += ((element.preco * 1)*element.qtd)
        });
    setCartTotal(acumulador);
  };

  const addItems = useContext(AddCartContext);

  useEffect(() => {
    let prev_items = JSON.parse(localStorage.getItem('cart')) || [];
    addItems(prev_items)
    setIsInitiallyFetched(true)
  }, [])


  useEffect(() => {
    if (isInitiallyFetched) {
      localStorage.setItem("cart", JSON.stringify(items));
      total();
    }
  }, [items]);

  const produtos = useContext(CartContext)
  const removeProduto = useContext(RemoveCartContext)

  function handleQtd(produto, qtd) {
    addItems(produto)
    produtos.map(async (produtinho) => {
      if (produto.nome == produtinho.nome) {
        await removeProduto(produtinho)
        produto = { ...produto, qtd: qtd }
        addItems(produto)
      }

    })
  }

  return (
    <Transition.Root show={abrido} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={desabrido}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={desabrido}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.length > 0 ? items.map((product) => (
                              <li key={product.nome} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imagem}
                                    alt={product.nome}
                                    className="h-full w-full object-contain object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p>{product.nome}</p>
                                      </h3>
                                      <p className="ml-4">{product.categoria}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.nome}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">

                                    <p className="text-gray-500">Qtd
                                      <select className='cursor-pointer appearance-none ml-2 px-1 border-b border-gray-900 text-end' name="qtd" id="qtd" value={product.qtd} onChange={event => handleQtd(product, event.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                      </select>
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={() => removeItem(product)}
                                        className="font-medium text-indigo-600 hover:text-indigo-400"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )) : <>Seu carrinho está vazio</>}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>R${cartTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or {' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            <Link href="/produtos">
                              Continue Shopping
                            </Link>
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
