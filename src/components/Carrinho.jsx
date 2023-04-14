import { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Swal from 'sweetalert2';
import {
  CartContext,
  RemoveCartContext,
  AddCartContext,
} from '@/context/Context';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

// see https://stackoverflow.com/questions/65523588/react-cart-with-context-and-localstorage

export default function Carrinho({ abrido, desabrido }) {
  const rota = useRouter();
  const items = useContext(CartContext);
  const removeItem = useContext(RemoveCartContext);
  const addItems = useContext(AddCartContext);
  // const [carrinho, setCarrinho] = useState([])
  const [cartTotal, setCartTotal] = useState(0);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

  const total = () => {
    let acumulador = 0;
    items.forEach((element) => {
      acumulador += element.preco * 1 * element.qtd;
    });
    setCartTotal(acumulador);
  };

  useEffect(() => {
    rota.events.on('routeChangeComplete', desabrido);
  }, [rota]);

  useEffect(() => {
    let prev_items = JSON.parse(localStorage.getItem('cart')) || [];
    addItems(prev_items);
    setIsInitiallyFetched(true);
  }, []);

  useEffect(() => {
    if (isInitiallyFetched) {
      localStorage.setItem('cart', JSON.stringify(items));
      total();
    }
  }, [items]);

  function handleQtd(produto, qtd) {
    addItems(produto);
    items.map(async (produtinho) => {
      if (produto.nome == produtinho.nome) {
        await removeItem(produtinho);
        produto = { ...produto, qtd: qtd };
        addItems(produto);
      }
    });
  }

  async function checkout() {
    const user = await getSession();
    if (!user) {
      return rota.push('/login');
    }
    await fetch('/api/firebase/createPedido', {
      method: 'POST',
      body: JSON.stringify({
        lista: items,
        subtotal: cartTotal,
        status: 'Pagamento Pendente',
      }),
    }).then(() => localStorage.setItem('cart', [0]));
    return rota.push('/checkout/pending');
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
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Carrinho de Compras
                        </Dialog.Title>
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
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {items.length > 0 ? (
                              items.map((product) => (
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
                                        <p className="ml-4">
                                          {product.categoria}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.nome}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-500 flex items-center">
                                        Qtd
                                        <div className="inline-block relative w-8">
                                          <select
                                            className="cursor-pointer appearance-none ml-2 px-1 pr-3 border-b border-gray-900 text-end block w-full bg-white shadow-b leading-tight focus:outline-none"
                                            name="qtd"
                                            id="qtd"
                                            value={product.qtd}
                                            onChange={(event) =>
                                              handleQtd(
                                                product,
                                                event.target.value
                                              )
                                            }
                                          >
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
                                          <div className="pointer-events-none absolute inset-y-0 -right-5 flex items-center px-2 text-gray-700">
                                            <svg
                                              class="fill-black h-4 w-4"
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 20 20"
                                            >
                                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>

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
                              ))
                            ) : (
                              <>
                                Adicione os{' '}
                                <Link
                                  href={'/produtos/all'}
                                  className="underline text-indigo-500"
                                >
                                  produtos
                                </Link>{' '}
                                na pagina do catálogo.{' '}
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>R${cartTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Valor total da compra.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={checkout}
                          className={
                            items.length > 0
                              ? `flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer`
                              : `bg-gray-300 px-6 py-3 rounded-md cursor-not-allowed text-gray-400`
                          }
                          disabled={items.length == 0 ? true : false}
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          ou{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            <Link href="/produtos/all">Ver mais produtos</Link>
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
