import { createContext, useContext, useEffect, useState } from "react";
import api from "../route/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await api.getAllCart();
            setCartData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addCart = async (itemId, req) => {
        try {
            await api.addCart([{ itemId, ...req }]);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };

    const removeData = async (id) => {
        try {
            await api.deleteCart([id]);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };

    const updateData = async (id, req) =>{
        api.updateCart(id, req)
            .then(() => {
                fetchCartData();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <CartContext.Provider value={{ cartData, addCart, removeData ,updateData}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
