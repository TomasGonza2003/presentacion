import React from 'react';
import { useProducts } from '../context/ProductContext';

function VendorDashboard() {
    const { products } = useProducts();

    const orders = [
        { id: 101, customer: 'Juan Perez', total: 450000, status: 'Pendiente' },
        { id: 102, customer: 'Maria Garcia', total: 120000, status: 'Enviado' },
        { id: 103, customer: 'Carlos Lopez', total: 89990, status: 'Entregado' },
    ];

    return (
        <div className="container py-5" style={{ marginTop: '56px' }}>
            <h1 className="mb-4">Panel de Vendedor</h1>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Productos</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>${product.price.toLocaleString()}</td>
                                                <td>{product.stock || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-success text-white">
                            <h4 className="mb-0">Órdenes</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Cliente</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>#{order.id}</td>
                                                <td>{order.customer}</td>
                                                <td>${order.total.toLocaleString()}</td>
                                                <td>
                                                    <span className={`badge ${order.status === 'Pendiente' ? 'bg-warning' :
                                                        order.status === 'Enviado' ? 'bg-info' : 'bg-success'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorDashboard;
