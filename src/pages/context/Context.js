
import { createContext } from 'react'

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  
  function getItem(){
    return JSON.parse(window.localStorage.getItem("carrinho")) || [];
  };
  
  function setItem(item){
    window.localStorage.setItem("carrinho", JSON.stringify(item));
  };
  

  return (
    <CarrinhoContext.Provider value={[getItem, setItem]}>
      {children}
    </CarrinhoContext.Provider>
  );
};



