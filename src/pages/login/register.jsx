import { LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Quicksand } from '@next/font/google'
import { Box, FormControl, TextField } from '@mui/material'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const quick = Quicksand({
  subsets: ['latin'],
  weight: 'variable'
})

export default function Login() {
  const [password, setPassword] = useState(false)
  const [erro, setErro] = useState(false)
  const [helperText, setHelperText] = useState(false)
  const rota = useRouter()
  async function _handleSubmit(event) {
    event.preventDefault()
    if (!password || !event.target.password.value || event.target.password.value != password) {
      setErro(true)
      setHelperText('Preencha a senha')
      return
    } else {
      setErro(false)
      setHelperText(false)
    }
    const data = {
      email: event.target.email.value,
      password: password
    }
    const batida = await fetch('http://localhost:3000/api/firebase/register',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const resposta = await batida.json()
    
    if (resposta.user) {
      Swal.fire({title: "Usuario criado com sucesso!", text:"Seja bem-vindo à loja de Produtos Clear!", icon:"success"})
      .then(() => {rota.push('/login')})
    }
    else{
      Swal.fire({title: "Erro ao criar a sua conta :(", text:"Tente novamente ou fale com um dos nossos desenvolvedores!", icon:"error"})

    }
  }
  function _doesPassMatch(event) {
    if (event.target.value == password){
      setErro(false)
      setHelperText('')
      return false
    }
    setErro(true)
    setHelperTextFunction()
    return true
  }
  function setHelperTextFunction(){
    setHelperText('As senhas devem coincidir')
  }
  return (
    <>
      <Link href="/" className='absolute flex items-center h-10 left-6 top-12 group md:left-14'>
        <ArrowLeftIcon className='h-6 group-hover:-translate-x-2 transition-all ease-out delay-100' />
        <span className={`${quick.className} text-lg ml-4`}>Voltar</span>
      </Link>




      <div className="flex min-h-screen items-center justify-center pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h2 className="mt-0 text-center text-3xl font-bold tracking-tight text-gray-900">
              Registre-se
            </h2>
          </div>  
          <form className="mt-8 space-y-6" onSubmit={_handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <Box >

                <TextField id='email' name='email' sx={{ height: 55, borderColor: 'red' }} variant="outlined" label="E-mail" className='w-full mb-4 appearance-none border-red-500 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                <TextField type='password' onChange={event=>setPassword(event.target.value)} sx={{ height: 55, p: 0 }} variant="outlined" label="Senha" className='w-full appearance-none mb-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                <TextField type='password' name='password' sx={{ height: 55, p: 0 }} variant="outlined" label="Confirme sua Senha" className='w-full appearance-none  text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' onBlur={_doesPassMatch} error={erro} helperText={helperText}/>

              </Box>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  required
                  id="privacidade"
                  name="privacidade"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="privacidade" className="ml-2 block text-sm text-gray-900">
                  Li e Aceito os termos
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium underline underline-offset-2 text-indigo-600 hover:text-indigo-500">
                  Já possuo uma conta
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
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