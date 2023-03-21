import React, { createContext, useCallback, useRef, useState } from 'react';
export const CartContext = createContext([]);
export const AddCartContext = createContext((item) => {});
export const RemoveCartContext = createContext((item) => {});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [itemsTotal, setItemsTotal] = useState([]);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  return (
    <AddCartContext.Provider
      value={useCallback((item) => {
        if (Array.isArray(item)) {
          setItems([...itemsRef.current, ...item]);
        } else {
          setItems([...itemsRef.current, item]);
        }
      }, [])}
    >
      <RemoveCartContext.Provider
        value={useCallback((item) => {
          const newItems = itemsRef.current.filter(
            (_item) => _item.nome != item.nome
          );
          setItems(newItems);
        }, [])}
      >
        <CartContext.Provider value={items}>{children}</CartContext.Provider>
      </RemoveCartContext.Provider>
    </AddCartContext.Provider>
  );
};
