import { LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Quicksand } from '@next/font/google'
import { Box, TextField } from '@mui/material'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const quick = Quicksand({
  subsets: ['latin'],
  weight: 'variable'
})

export default function Login() {
  const [userInfo, setUserInfo] = useState({email: '', password: ''});
  function _handleLogin(e){
    e.preventDefault()
    signIn('credentials',{
      email: userInfo.email,
      password: userInfo.password,
      cpf: ''
    })
  }
  return (
    <>
    <Link href="/" className='absolute flex items-center h-10 left-6 top-12 group md:left-14'>
      <ArrowLeftIcon className='h-6 group-hover:-translate-x-2 transition-all ease-out delay-100'/>
      <span className={`${quick.className} text-lg ml-4`}>Voltar</span>
    </Link>


    
    
      <div className="flex min-h-screen items-center justify-center pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h2 className="mt-0 text-center text-3xl font-bold tracking-tight text-gray-900">
              Bem-Vindo!
            </h2>
            
            <p className="mt-2 text-center text-sm text-gray-600">
              Faça Login ou{' '}
              <Link href="/login/register" className="font-medium underline underline-offset-1 text-indigo-600 hover:text-indigo-500 active:text-indigo-500">
                registre-se aqui
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                <Box >

                <TextField value={userInfo.email} onChange={event=>setUserInfo({...userInfo, email:event.target.value})} sx={{height:55, borderColor: 'red'}} variant="filled" label="E-mail" className='w-full  appearance-none border-red-500 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'/>
                <TextField value={userInfo.password} onChange={event=>setUserInfo({...userInfo, password: event.target.value})} sx={{height:55, p: 0}} variant="filled" label="Senha" className='w-full appearance-none  text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'/>

                </Box>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Esqueci minha senha
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={_handleLogin}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
// /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// import { LockClosedIcon } from '@heroicons/react/20/solid'

// export default function Login() {
//   return (
//     <>
//       {/*
//         This example requires updating your template:

//         ```
//         <html class="h-full bg-gray-50">
//         <body class="h-full">
//         ```
//       */}
//       <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8">
//           <div>
//             <img
//               className="mx-auto h-12 w-auto"
//               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//               alt="Your Company"
//             />
//             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
//               Sign in to your account
//             </h2>
//             <p className="mt-2 text-center text-sm text-gray-600">
//               Or{' '}
//               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 start your 14-day free trial
//               </a>
//             </p>
//           </div>
//           <form className="mt-8 space-y-6" action="#" method="POST">
//             <input type="hidden" name="remember" defaultValue="true" />
//             <div className="-space-y-px rounded-md shadow-sm">
//               <div>
//                 <label htmlFor="email-address" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Email address"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Password"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//               >
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
//                 </span>
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }
