import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Carrito() {
    const { carrito, eliminarDelCarrito, totalPrecio, totalItems, aumentarCantidad, disminuirCantidad } = useCart();

    const formatearPrecio = (precio) => {
        if (typeof precio !== 'number' || isNaN(precio)) {
            return '$?';
        }
        return `$${precio.toLocaleString('es-CL')}`;
    };

    // Carrito vacío
    if (!carrito || carrito.length === 0) {
        return (
            <main className="py-5" style={{ marginTop: '56px' }}>
                <div className="container text-center">
                    <h1 className="section-title mb-4">Carrito de Compras</h1>
                    <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
                    <p className="fs-4">Tu carrito está vacío.</p>
                    <p>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
                    <Link to="/catalogo" className="btn btn-primary btn-lg mt-3">
                        Ir al Catálogo
                    </Link>
                </div>
            </main>
        );
    }

    // Si no está vacío
    return (
        <main className="py-5" style={{ marginTop: '56px' }}>
            <div className="container">
                <h1 className="section-title mb-4">Carrito de Compras</h1>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="table-responsive">
                            <table className="table table-dark table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Total</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map(producto => (
                                        <tr key={producto.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={producto.imageUrl || 'placeholder.jpg'}
                                                        alt={producto.name || 'Producto sin nombre'}
                                                        className="img-fluid rounded me-3"
                                                        style={{ width: '100px', height: '100px', objectFit: 'contain', backgroundColor: 'white' }}
                                                    />
                                                    <div>
                                                        <h6 className="mb-0">{producto.name || 'Producto'}</h6>
                                                        <small className="text-muted">{producto.description || ''}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{formatearPrecio(producto.price)}</td>

                                            <td>
                                                <div className="input-group" style={{ width: '130px' }}>
                                                    <button
                                                        className="btn btn-outline-light btn-sm"
                                                        type="button"
                                                        onClick={() => disminuirCantidad(producto.id)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm text-center"
                                                        value={producto.quantity}
                                                        readOnly
                                                        aria-label="Cantidad"
                                                    />
                                                    <button
                                                        className="btn btn-outline-light btn-sm"
                                                        type="button"
                                                        onClick={() => aumentarCantidad(producto.id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>

                                            <td>{formatearPrecio(producto.price * producto.quantity)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => eliminarDelCarrito(producto.id)}
                                                    aria-label={`Eliminar ${producto.name || 'producto'}`}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card bg-dark border-secondary">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-4">Resumen de tu compra</h5>
                                <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                                    <p className="mb-0 fw-bold">Producto ({totalItems})</p>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <p className="text-muted">Total</p>
                                    <p className="fw-bold">{formatearPrecio(totalPrecio)}</p>
                                </div>

                                <hr className="text-white-50" />

                                <div className="d-flex align-items-center bg-secondary p-3 rounded mb-3">
                                    <i className="bi bi-truck me-3 fs-4 text-white-50"></i>
                                    <p className="mb-0 text-white-50">El valor del despacho se calculará cuando se seleccione el tipo de entrega.</p>
                                </div>

                                <div className="d-grid mt-4">

                                    <Link to="/checkout" className="btn btn-primary btn-lg">
                                        Continuar a Pago
                                    </Link>
                                </div>

                                <div className="d-flex justify-content-around text-center mt-3">
                                    <div>
                                        <i className="bi bi-shield-lock fs-5"></i>
                                        <p className="small mb-0">Pago 100% seguro</p>
                                    </div>
                                    <div>
                                        <i className="bi bi-shield-check fs-5"></i>
                                        <p className="small mb-0">Garantía en tus productos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Carrito;