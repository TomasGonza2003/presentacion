import React from 'react';
import { useCart } from '../context/CartContext'; 

function ProductCard({ producto }) {
    //traemos la función que viene de CartContext
    const { agregarAlCarrito } = useCart();
    
    const formattedPrice = `$${producto.price.toLocaleString('es-CL')}`;

    return (
        <div className="card product-card h-100">
            <img src={producto.imageUrl} className="card-img-top" alt={producto.name} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.name}</h5>
                <p className="card-text text-body-secondary">{producto.description}</p>
                <div className="mt-auto">
                    <span className="badge bg-success">-{producto.discount}%</span>
                    <p className="product-price my-2">{formattedPrice}</p>
                        <button 
                        className="btn btn-primary w-100"
                        onClick={() => agregarAlCarrito(producto)}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;