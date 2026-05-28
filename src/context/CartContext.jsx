import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('papercraft-cart') || '[]') } catch { return [] }
  })
  const [dark, setDark] = useState(() => localStorage.getItem('papercraft-dark') === 'true')

  useEffect(() => {
    localStorage.setItem('papercraft-cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('papercraft-dark', dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const addItem = (item) => {
    setItems(prev => {
      const existing = prev.find(i => i.cartId === item.cartId)
      if (existing) return prev.map(i => i.cartId === item.cartId ? { ...i, qty: i.qty + item.qty } : i)
      return [...prev, item]
    })
  }

  const removeItem = (cartId) => setItems(prev => prev.filter(i => i.cartId !== cartId))

  const updateQty = (cartId, qty) => {
    if (qty < 1) return removeItem(cartId)
    setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, dark, setDark }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
