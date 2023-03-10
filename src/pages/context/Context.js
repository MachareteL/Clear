import { createContext } from 'react'

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const setItem = (item) => {
    window.localStorage.setItem("loja", JSON.stringify(item));
  };
  function getItem(item){
    return JSON.parse(window.localStorage.getItem("loja")) || [];
  };

  return (
    <CarrinhoContext.Provider value={[getItem, setItem]}>
      {children}
    </CarrinhoContext.Provider>
  );
};



