import { createContext, useContext, useEffect, useState } from "react";
import api from "../route/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const getCartData = async () => {
        try {
            const response = await api.getAllCart();
            setCart(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCartData();
    }, []);

    const addToCart = async (itemId, req) => {
        try {
            await api.addCart([{ itemId, ...req }]);
            await getCartData(); // Cập nhật lại giỏ hàng
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, getCartData, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
