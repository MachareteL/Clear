import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { Component } from 'react';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
]
var listaProdutos = []

class Carrinho extends Component {
  state = { stateProdutos: [] } 
  
  montarCarrinho(){
    console.log(localStorage.getItem('loja'));
    if (localStorage.getItem('loja') != null) {
      listaProdutos = JSON.parse(localStorage.getItem('loja'));
      this.setState({stateProdutos: listaProdutos})
      if(localStorage.getItem('loja') == ""){
        localStorage.removeItem('loja')
    }
    }
    console.log(this.state.stateProdutos);
  }

  componentDidMount(){
    console.log("carregando pagina");
    this.montarCarrinho()
  }
  

  handleAdd(produto){
    listaProdutos.push(produto)
    this.setState({stateProdutos: listaProdutos})
    console.log(`Recebido produto ${produto.name} e adicionado ao carrinho, localstorage e state`);
    localStorage.setItem('loja', JSON.stringify(listaProdutos));
  }

  handleDelete(id) {
    for (let index = 0; index < listaProdutos.length; index++) {
      if (listaProdutos[index].id == id) {
        listaProdutos.splice(index, 1)
      }
    }      
    localStorage.setItem('loja', JSON.stringify(listaProdutos));
    this.setState({stateProdutos: listaProdutos})
  }
  
  
  render() { 
    return (<Transition.Root show={this.props.abrido} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={this.props.desabrido}>
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
                            onClick={this.props.desabrido}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {this.state.stateProdutos.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.name}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.id}</p>

                                    <div className="flex">
                                      <button
                                        onClick={()=>this.handleDelete(product.id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-400"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
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
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={this.props.desabrido}
                          >
                            Continue Shopping
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
    </Transition.Root>);
  }
}
 
export default Carrinho;



// export default function Carrinho() {


//     useEffect(() => {
//         
//     })

//     // function salvarCarrinho(event){
//     //     event.preventDefault();
//     //     localStorage.setItem('loja', JSON.stringify(listaProdutos));
//     // }

//     // function handleKart(produto) {
//     //     console.log("adicionando produto: "+ produto.name);
//     //     listaProdutos.push(produto)
//     // }

//   return (
    
//   )
// }
