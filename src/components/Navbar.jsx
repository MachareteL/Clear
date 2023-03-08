import { Disclosure, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import BotaoLogin from './BotaoLogin'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { Pacifico, Quicksand } from '@next/font/google'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Carrinho from './Carrinho'
import Link from 'next/link'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin']
})

const quick = Quicksand({
  weight: '500',
  subsets: ['latin']
})

export default function NavBar() {
  const route = useRouter()
  const navigation = [
    { name: 'HomePage', href: '/', current: (route.pathname == "/" ? true : false) },
    { name: 'Produtos', href: '/produtos', current: (route.pathname == "/produtos" ? true : false) },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]
  const [aberto, setOpen] = useState(false)




  return (
    <Disclosure as="nav" className={classNames("bg-[#fff] border-b border-[#e3e9ed] shadow-sm")}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-between">
                <div className="flex flex-shrink-0 items-center cursor-pointer" onClick={() => route.push('/')}>
                  <img
                    className="block w-16 h-auto logo"
                    src="https://macharetelucas.com.br/img/empregados.png"
                    alt="Produtos Clear"
                  />
                  <span className={`${pacifico.className} text-5xl text-[#0f73ee] logo`}>Clear</span>
                </div>
                <div className="hidden md:ml-6 md:flex items-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'text-indigo-700 relative after:absolute after:w-full after:h-[3px] after:left-0 after:bottom-0 after:origin-left after:transition ease-in-out after:duration-300 after:bg-indigo-700' : 'text-indigo-700 relative after:absolute after:w-full after:h-[3px] after:left-0 after:bottom-0 after:origin-left after:scale-0 after:transition ease-in-out after:duration-300 hover:after:scale-100 after:bg-indigo-700',
                          ` ${quick.className} px-3 py-2 rounded-md text-md font-medium tracking-normal`
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute justify-between w-fit md:w-36 inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">


                {/* Profile dropdown */}
                <button className='hidden md:block' onClick={() => console.log('e')}>
                  <HeartIcon className='w-8 h-auto text-indigo-600 cursor-pointer hover:text-[#96116b]' />
                </button>

                <button className='hidden md:block' onClick={() => setOpen(true)}>
                  <ShoppingCartIcon className='w-8 h-auto text-indigo-600 cursor-pointer hover:text-[#96116b]' />
                </button>
                <Carrinho abrido={aberto} desabrido={() => setOpen(!aberto)} />


                <BotaoLogin />

              </div>
            </div>
          </div>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
