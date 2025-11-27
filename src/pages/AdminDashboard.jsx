import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <main className="container py-5 mt-5">
            <h2 className="section-title mb-4">Panel de Administración</h2>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary h-100">
                        <div className="card-body text-center">
                            <i className="bi bi-cart4 fs-1 mb-2"></i>
                            <h5 className="card-title">Ventas Totales</h5>
                            <p className="card-text fs-2 fw-bold">1,234</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success h-100">
                        <div className="card-body text-center">
                            <i className="bi bi-box-seam fs-1 mb-2"></i>
                            <h5 className="card-title">Productos</h5>
                            <p className="card-text fs-2 fw-bold">45</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body text-center">
                            <i className="bi bi-people-fill fs-1 mb-2"></i>
                            <h5 className="card-title">Usuarios</h5>
                            <p className="card-text fs-2 fw-bold">890</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <h4>Accesos Rápidos</h4>
                        <div className="d-grid gap-2 mt-3">
                            <Link to="/admin/productos" className="btn btn-outline-light text-start">
                                <i className="bi bi-box-seam me-2"></i> Gestionar Productos
                            </Link>
                            <Link to="/admin/usuarios" className="btn btn-outline-light text-start">
                                <i className="bi bi-person-gear me-2"></i> Gestionar Usuarios
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminDashboard;