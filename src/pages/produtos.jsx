import { Quicksand } from "@next/font/google";
import { useCallback, useContext, useState } from "react";
import { AddCartContext, CartContext, RemoveCartContext } from "@/context/Context";

const quick = Quicksand({
    weight: 'variable',
    subsets: ['latin']
})



export default function Produtos({products}) {
    const produtos = useContext(CartContext)
    const addItems = useContext(AddCartContext);
    const removeProduto = useContext(RemoveCartContext)
    // const products = [
    //     {
    //         _id: 1,
    //         imgSrc: 'teste',
    //         imgAlt: 'teste',
    //         name: "Product One",
    //         price: 20
    //     },
    //     {
    //         _id: 2,
    //         name: "Product Two",
    //         price: 56
    //     },
    //     {
    //         _id: 3,
    //         name: "Product Three",
    //         price: 13
    //     }
    // ];

    const [carrinho, setCarrinho] = useState([])

    const handleAdd = (produto) => {
        if (produtos.length == 0) {
            addItems(produto)
        }
        produtos.map( async (produtinho)=>{
            if(produto._id == produtinho._id){
                await removeProduto(produtinho)

                produto = {...produto, qtd: produtinho.qtd+1}
                addItems(produto)
            }
        })
    }
    return (
        <>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className={`${quick.className} text-2xl font-bold tracking-tight text-gray-900`}>Nossos produtos</h2>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product._id} className="group relative" onClick={event => handleAdd({...product, qtd:1})}>
                            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 cursor-pointer">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a>
                                            <span aria-hidden="true" className="absolute inset-0 cursor-pointer" />
                                            {product.nome}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.categoria}</p>
                                </div>
                                <p className={"text-sm font-medium text-gray-900"}>R${product.preco}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>);
}

export async function getServerSideProps() {
    const batida = await fetch('http://localhost:3000/api/produtos');
    const products = await batida.json();

    return {
        props: { products }
    }
}

