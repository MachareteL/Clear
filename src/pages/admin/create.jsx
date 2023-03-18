import { Storage } from '../../lib/firebaseConfig'
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

export default function CriarProduto() {
    const [carregamento, setCarregamento] = useState(0);
    const [URL, setURL] = useState("");
    const [touched, setTouched] = useState(false)
    const [nome, setNome] = useState('')
    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            nome: nome,
            descricao: event.target.descricao.value,
            preco: event.target.preco.value,
            categoria: event.target.categoria.value,
            imagem: URL
        }
        console.log(data);
        const batida = await fetch('http://localhost:3000/api/produtos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const response = await batida.json()
        console.log(response);
    }

    function handleInput(e) {

        e.preventDefault()
        console.log("Entrou no input");
        console.log(e);
        if (touched) {
            setURL("")
            setTouched(!touched);
            return;
        }
        else {
            setTouched(true);
        }
        const file = e.target.files[0];
        if (!file) return;
        const storageREF = ref(Storage, `images/${nome}`);
        const uploadTask = uploadBytesResumable(storageREF, file);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setCarregamento(progress)
            },
            error => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setURL(url);
                })
            }
        )
    }

    return (
        <div className="container m-auto">
            <div>
                <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="px-4 sm:px-0 mt-5 text-base font-semibold leading-6 text-gray-900">Registrar um novo produto</h3>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    {/* Campo nome e categoria*/}
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-3 ">
                                            <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                                                Nome do Produto
                                            </label>
                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="nome"
                                                    id="nome"
                                                    className="block w-full px-4 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Detergente Clear"
                                                    onChange={(e)=>setNome(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">
                                                Categoria do Produto
                                            </label>
                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                <select defaultValue={""} required name="categoria" id="categoria" className="block w-full px-4 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <option value="" disabled>Selecione uma categoria</option>
                                                    <option value="desinfetante">Desinfetante</option>
                                                    <option value="sabao">Sabão</option>
                                                    <option value="detergente">Detergente</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        <label htmlFor="descricao" className="block text-sm font-medium leading-6 text-gray-900">
                                            Descrição
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="descricao"
                                                name="descricao"
                                                rows={3}
                                                className="p-2 mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                                placeholder="Descrição do Produto a ser registrada no banco de dados"
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Foto do Produto</label>

                                        {!URL && <progress value={carregamento} max={100} className={`${touched ? 'w-full h-2 rounded-full bg-blue-500' : 'hidden'}`} />}
                                        {touched? <div className='flex justify-center' onClick={(e)=>handleInput(e)}><img src={URL} className='p-1 outline-dashed outline-1'/> </div>:
                                        <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onInput={(e) => { handleInput(e) }} />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    }
                                    </div>
                                    <div>
                                        <div className="grid">
                                            <label htmlFor="preco" className="block text-sm font-medium leading-6 text-gray-900">Preço</label>
                                            <input type="number" name="preco" id="preco" className="block w-full px-4 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}



