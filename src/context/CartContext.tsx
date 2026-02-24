"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "@/store/api/frontendApi";

export interface CartItem extends Product {
    quantity: number;
    variation_combination_id?: string | number | null;
    variation_details?: Record<string, string> | null;
    cartItemId: string; // Unique ID for this specific variation in the cart
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number, variationId?: string | number | null, variationDetails?: Record<string, string> | null, openDrawer?: boolean) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("alinggon_cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("alinggon_cart", JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (
        product: Product,
        quantity: number = 1,
        variationId: string | number | null = null,
        variationDetails: Record<string, string> | null = null,
        openDrawer: boolean = true
    ) => {
        const cartItemId = variationId ? `${product.id}-${variationId}` : `${product.id}`;

        setCart((prev) => {
            const existing = prev.find((item) => item.cartItemId === cartItemId);
            if (existing) {
                return prev.map((item) =>
                    item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
                );
            }

            // If it's a variation, the price might be different. 
            // In a real app, we should pass the correct price here.
            // For now, we assume the product object passed in already has the correct price for the variation.

            return [...prev, {
                ...product,
                quantity,
                variation_combination_id: variationId,
                variation_details: variationDetails,
                cartItemId
            }];
        });

        if (openDrawer) {
            setIsCartOpen(true);
        }
    };

    const removeFromCart = (cartItemId: string) => {
        setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isCartOpen,
                openCart,
                closeCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
