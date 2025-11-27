import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carrito from './Carrito'; 
import { useCart } from '../context/CartContext'; 


jest.mock('../context/CartContext', () => ({
    useCart: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    Link: ({ children, to }) => <a href={to}>{children}</a>, 
}));

describe('Componente Carrito', () => {

    test('Debe mostrar el mensaje de "carrito vacío" si no hay productos', () => {
        useCart.mockReturnValue({
            carrito: [],
            totalItems: 0,
            totalPrecio: 0,
            eliminarDelCarrito: jest.fn(),
        });

        render(<Carrito />);

        expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
        expect(screen.getByText('¿No sabes qué comprar? ¡Miles de productos te esperan!')).toBeInTheDocument();
        
        const linkCatalogo = screen.getByText('Ir al Catálogo');
        expect(linkCatalogo).toBeInTheDocument();
        expect(linkCatalogo.closest('a')).toHaveAttribute('href', '/catalogo');
    });

    test('Debe mostrar los productos en el carrito y llamar a eliminarDelCarrito al hacer clic', () => {
        const mockEliminarDelCarrito = jest.fn();
        const mockCarrito = [
            { id: 101, name: 'Producto de Prueba 1', price: 10000, description: 'Desc 1', imageUrl: 'img1.jpg' },
            { id: 102, name: 'Producto de Prueba 2', price: 5000, description: 'Desc 2', imageUrl: 'img2.jpg' }
        ];

        useCart.mockReturnValue({
            carrito: mockCarrito,
            totalItems: 2,
            totalPrecio: 15000,
            eliminarDelCarrito: mockEliminarDelCarrito,
        });

        render(<Carrito />);

        expect(screen.getByText('Producto de Prueba 1')).toBeInTheDocument();
        expect(screen.getByText('Producto de Prueba 2')).toBeInTheDocument();

        expect(screen.queryByText('Tu carrito está vacío.')).not.toBeInTheDocument();

        expect(screen.getByText('Producto (2)')).toBeInTheDocument();
        expect(screen.getByText('$15.000')).toBeInTheDocument(); // Total precio formateado

        const botonEliminar = screen.getByLabelText('Eliminar Producto de Prueba 1');
        fireEvent.click(botonEliminar);

        expect(mockEliminarDelCarrito).toHaveBeenCalledTimes(1);
        
        expect(mockEliminarDelCarrito).toHaveBeenCalledWith(101);
    });
});