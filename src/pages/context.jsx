import React, { useContext } from 'react'
import { CarrinhoContext } from './context/Context'

export default function context() {
    const carrinho = useContext(CarrinhoContext)

    return (
        <div>context
            <button onClick={()=>console.log(carrinho)}>Click</button>
        </div>
    )
}
