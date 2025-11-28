import React, { createContext, useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Crear el Contexto
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

// Creamos el provider
export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        try {
            const carritoGuardado = localStorage.getItem('carrito');
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        } catch (error) {
            console.error("Error al leer el carrito de localStorage", error);
            return [];
        }
    });

    const [showModal, setShowModal] = useState(false);

    // Se guardará el LocalStorage cada vez que el carrito cambie
    useEffect(() => {
        try {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } catch (error) {
            console.error("Error al guardar el carrito en localStorage", error);
        }
    }, [carrito]);

    // Funciones
    const agregarAlCarrito = (producto) => {
        const itemExistente = carrito.find(item => item.id === producto.id);

        if (itemExistente) {
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCarrito(carritoActual => [...carritoActual, { ...producto, quantity: 1 }]);
        }

        setShowModal(true);
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carritoActual => carritoActual.filter(item => item.id !== id));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const aumentarCantidad = (id) => {
        setCarrito(carritoActual =>
            carritoActual.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const disminuirCantidad = (id) => {
        setCarrito(carritoActual => {
            const itemADisminuir = carritoActual.find(item => item.id === id);

            // Si la cantidad es 1 se elimina el producto
            if (itemADisminuir?.quantity === 1) {
                return carritoActual.filter(item => item.id !== id);
            }
            return carritoActual.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const closeModal = () => setShowModal(false);

    const totalItems = carrito.reduce((total, item) => total + item.quantity, 0);

    const totalPrecio = carrito.reduce((total, item) => {
        const precio = Number(item.price) || 0;
        return total + (precio * item.quantity);
    }, 0);

    const value = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        limpiarCarrito,
        totalItems,
        totalPrecio,
        aumentarCantidad,
        disminuirCantidad
    };

    return (
        <CartContext.Provider value={value}>
            {children}

            {/* Ventanita para que se muestre cuando agrega un producto */}
            <Modal show={showModal} onHide={closeModal} centered className="custom-dark-modal">
                <Modal.Header closeButton>
                    <Modal.Title>¡Producto Añadido!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    El producto se ha añadido correctamente a tu carrito.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Seguir Comprando
                    </Button>
                    <Button as={Link} to="/carrito" variant="primary" onClick={closeModal}>
                        Ir al Carrito
                    </Button>
                </Modal.Footer>
            </Modal>
        </CartContext.Provider>
    );
};