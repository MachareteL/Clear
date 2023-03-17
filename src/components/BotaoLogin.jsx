import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { Menu, Transition } from '@headlessui/react'





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function BotaoLogin() {
  const { data: session } = useSession()
  
  async function handleSubmit() {
    const res = await signIn()
    console.log("entrou no handlesubmite");
    console.log(res);
  }




  
  if (session) {
    const foto = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdevelopers.elementor.com%2Fdocs%2Fhooks%2Fplaceholder-image%2F&psig=AOvVaw01dMw8eigiWorOheOQxwWM&ust=1679078073313000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPig_NuL4f0CFQAAAAAdAAAAABAE'
    return (
      <>
        <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                     
                      <img
                        className="h-8 w-8 rounded-full"
                        src={foto}
                        alt="user"
                      />
                    </Menu.Button>
                      
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-2 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/matricula/estado"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Suas Matriculas
                          </a>
                        )}
                      </Menu.Item> */}
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/matricula/alunos"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={() => signOut({callbackUrl: '/'})} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-start')}> Deslogar </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
        

      </>
    )
  }
  return (
    <>
    
    <button onClick={() => handleSubmit()} className="bg-[#790252] text-white text-sm font-bold px-4 py-2 rounded">Login</button>

    </>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context)
  
  return{
    props: teste
  }
}