import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { carrito, totalPrecio, limpiarCarrito } = useCart(); 
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        direccion: '',
        region: '',
        comuna: '',
        tarjeta: ''
    });

    if (carrito.length === 0) {
        return <div className="container py-5 mt-5"><h3>El carrito está vacío</h3></div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simular proceso de pago
        setTimeout(() => {
            // --- CAMBIO REALIZADO: Ejecutar la función para vaciar el carrito ---
            limpiarCarrito();
            navigate('/compra-exitosa');
        }, 1000);
    };

    return (
        <main className="container py-5 mt-5">
            <h2 className="section-title mb-4">Finalizar Compra</h2>
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} className="p-4 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <h4 className="mb-3">Dirección de Envío</h4>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" required onChange={e => setDatos({...datos, direccion: e.target.value})} />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Región</label>
                                <select className="form-select" required onChange={e => setDatos({...datos, region: e.target.value})}>
                                    <option value="">Selecciona...</option>
                                    <option value="metropolitana">Metropolitana</option>
                                    <option value="valparaiso">Valparaíso</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Comuna</label>
                                <input type="text" className="form-control" required onChange={e => setDatos({...datos, comuna: e.target.value})} />
                            </div>
                        </div>
                        <hr className="my-4"/>
                        <h4 className="mb-3">Pago</h4>
                        <div className="mb-3">
                            <label className="form-label">Número de Tarjeta</label>
                            <input type="text" className="form-control" placeholder="**** **** **** ****" required />
                        </div>
                        <button className="btn btn-success w-100 btn-lg" type="submit">Pagar ${totalPrecio.toLocaleString('es-CL')}</button>
                    </form>
                </div>
                <div className="col-md-4">
                    <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <h4>Resumen</h4>
                        <ul className="list-group list-group-flush bg-transparent">
                            {carrito.map(item => (
                                <li key={item.id} className="list-group-item bg-transparent text-white d-flex justify-content-between">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                                </li>
                            ))}
                            <li className="list-group-item bg-transparent text-white d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>${totalPrecio.toLocaleString('es-CL')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Checkout;