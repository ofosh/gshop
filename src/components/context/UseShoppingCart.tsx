import { useContext, createContext, ReactNode, useState } from 'react'
import ShoppingCart from '../ShoppingCart'
import {UseLocalStorage} from "../hooks/UseLocalStorage"
type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity:(id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)
const UseShoppingCart = () => {
  return (
    useContext(ShoppingCartContext)
  )
}

export default UseShoppingCart

export function ShoppingCartProvider( { children }: ShoppingCartProviderProps ) {
  const [isOpen, setIsopen] = useState(false)
  const [cartItems, setCartItems] = UseLocalStorage<CartItem[]>("shopping-cart", [])

  const openCart = () => setIsopen(true)
  const closeCart = () => setIsopen(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )

  
  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number){
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, {id, quantity: 1}]
      }
      else {
        return currItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1 }
          }
          else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number){
    setCartItems(currItems => {
      if (currItems.find(item => item.id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      }
      else {
        return currItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1 }
          }
          else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
    
  }

  return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity}}>
    {children}
    <ShoppingCart isOpen={isOpen} />
  </ShoppingCartContext.Provider>
}