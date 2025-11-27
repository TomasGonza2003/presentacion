import React, { createContext, useState, useEffect, useContext } from 'react';
import { productos as initialProducts } from '../data/productos';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load products from localStorage or use initial data
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }
        setLoading(false);
    }, []);

    const saveProducts = (newProducts) => {
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() }; // Simple ID generation
        const updatedProducts = [...products, newProduct];
        saveProducts(updatedProducts);
    };

    const updateProduct = (updatedProduct) => {
        const updatedProducts = products.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
        );
        saveProducts(updatedProducts);
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        saveProducts(updatedProducts);
    };

    const getProductById = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    const value = {
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
    return useContext(ProductContext);
};
