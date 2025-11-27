import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { useCart, CartProvider } from './CartContext'; 

// Producto de prueba base
const mockProduct = { id: 1, name: 'Laptop de Prueba', price: 500000 };

// Mock de localStorage
const localStorageMock = (function() {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        removeItem: jest.fn(key => {
            delete store[key];
        }),
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('CartContext (Lógica de Carrito)', () => {

    beforeEach(() => {
        // Limpiar el localStorage y los mocks antes de cada test
        localStorage.clear();
        jest.clearAllMocks();
    });

    // Helper para renderizar el hook y envolverlo con el Provider
    const getHookResult = () => {
        return renderHook(() => useCart(), {
            wrapper: CartProvider,
        });
    };

    // ----------------------------------------------------------------------
    // PRUEBA 1: Debería añadir un producto al carrito
    // ----------------------------------------------------------------------
    test('1. Debería añadir un nuevo producto al carrito con quantity: 1', () => {
        const { result } = getHookResult();
        
        // Ejecución
        act(() => {
            result.current.agregarAlCarrito(mockProduct);
        });

        // Resultado Esperado
        expect(result.current.carrito.length).toBe(1);
        expect(result.current.carrito[0].id).toBe(1);
        // Verifica que se añadió con quantity: 1
        expect(result.current.carrito[0].quantity).toBe(1); 
    });


    // ----------------------------------------------------------------------
    // PRUEBA 2: Debería aumentar la cantidad si se añade el mismo producto
    // ----------------------------------------------------------------------
    test('2. Debería aumentar la cantidad del producto si se añade por segunda vez', () => {
        const { result } = getHookResult();
        
        // Ejecución: añadir el mismo producto dos veces
        act(() => {
            result.current.agregarAlCarrito(mockProduct);
        });
        act(() => {
            result.current.agregarAlCarrito(mockProduct);
        });

        // Resultado Esperado
        // La longitud sigue siendo 1
        expect(result.current.carrito.length).toBe(1); 
        // La cantidad del item debe ser 2
        expect(result.current.carrito[0].quantity).toBe(2); 
    });


    // ----------------------------------------------------------------------
    // PRUEBA 3: Debería aumentar y disminuir la cantidad con las funciones específicas
    // ----------------------------------------------------------------------
    test('3. Debería aumentar y disminuir la cantidad usando aumentarCantidad y disminuirCantidad', () => {
        const { result } = getHookResult();
        
        // 1. Añadir (quantity: 1)
        act(() => {
            result.current.agregarAlCarrito(mockProduct);
        });
        expect(result.current.carrito[0].quantity).toBe(1); 

        // 2. Aumentar (quantity: 2)
        act(() => {
            result.current.aumentarCantidad(mockProduct.id);
        });
        expect(result.current.carrito[0].quantity).toBe(2); 

        // 3. Disminuir (quantity: 1)
        act(() => {
            result.current.disminuirCantidad(mockProduct.id);
        });
        expect(result.current.carrito[0].quantity).toBe(1); 
    });


    // ----------------------------------------------------------------------
    // PRUEBA 4: Debería eliminar el producto si la cantidad llega a 0 al disminuir
    // ----------------------------------------------------------------------
    test('4. Debería eliminar el producto del carrito si la cantidad llega a 0 al disminuir', () => {
        const { result } = getHookResult();
        
        // 1. Añadir (quantity: 1)
        act(() => {
            result.current.agregarAlCarrito(mockProduct);
        });
        expect(result.current.carrito.length).toBe(1);

        // 2. Disminuir (quantity debe llegar a 0 y ser eliminado)
        act(() => {
            result.current.disminuirCantidad(mockProduct.id);
        });

        // Resultado Esperado
        expect(result.current.carrito.length).toBe(0); 
    });

    // ----------------------------------------------------------------------
    // PRUEBA 5: Debería calcular totalItems y totalPrecio correctamente
    // ----------------------------------------------------------------------
    test('5. Debería calcular totalItems y totalPrecio sumando las cantidades y precios * cantidad', () => {
        const { result } = getHookResult();
        
        const product1 = { id: 10, name: 'Item 1', price: 1000 };
        const product2 = { id: 20, name: 'Item 2', price: 2000 };

        act(() => {
            // Añade Item 1 (Cant: 1, Total: 1000)
            result.current.agregarAlCarrito(product1); 
            // Añade Item 1 otra vez (Cant: 2, Total: 2000)
            result.current.agregarAlCarrito(product1); 
            // Añade Item 2 (Cant: 1, Total: 2000)
            result.current.agregarAlCarrito(product2); 
        });

        expect(result.current.totalItems).toBe(3); 
        
        expect(result.current.totalPrecio).toBe(4000); 
    });

});