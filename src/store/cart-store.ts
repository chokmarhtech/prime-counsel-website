import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/payload-types'
import { v4 as uuidv4 } from 'uuid'

export interface CartItem extends Product {
  cartItemId: string
  quantity: number
  bookingDate?: string
  bookingTime?: string
}

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  isAddModalOpen: boolean
  lastAddedProduct: Product | null
  
  addItem: (product: Product, bookingDate?: string, bookingTime?: string) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  
  setCartOpen: (isOpen: boolean) => void
  setAddModalOpen: (isOpen: boolean, product?: Product) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      isAddModalOpen: false,
      lastAddedProduct: null,

      addItem: (product, bookingDate, bookingTime) => set((state) => {
        // If it's a regular product (no booking date), check if we can just increment quantity
        if (!bookingDate) {
          const existingItem = state.items.find(item => item.id === product.id && !item.bookingDate)
          if (existingItem) {
             return {
               items: state.items.map(item => 
                 item.cartItemId === existingItem.cartItemId 
                   ? { ...item, quantity: item.quantity + 1 }
                   : item
               )
             }
          }
        }
        
        // Generate client-side unique cart item ID
        const cartItemId = typeof crypto !== 'undefined' && crypto.randomUUID 
          ? crypto.randomUUID() 
          : Math.random().toString(36).substring(2, 9) + Date.now().toString(36)

        return { 
          items: [...state.items, { 
            ...product, 
            cartItemId,
            quantity: 1,
            bookingDate,
            bookingTime
          }] 
        }
      }),
      
      removeItem: (cartItemId) => set((state) => ({
        items: state.items.filter(item => item.cartItemId !== cartItemId)
      })),

      updateQuantity: (cartItemId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      })),

      clearCart: () => set({ items: [] }),

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      
      setAddModalOpen: (isOpen, product) => set((state) => ({ 
        isAddModalOpen: isOpen,
        lastAddedProduct: product !== undefined ? product : state.lastAddedProduct
      })),

    }),
    {
      name: 'prime-cart-storage',
    }
  )
)

