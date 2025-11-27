import React from 'react';
import { Link } from 'react-router-dom';

function CompraExitosa() {
    return (
        <main className="container py-5 mt-5 text-center">
            <div className="p-5 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                <h1 className="mt-3">¡Gracias por tu compra!</h1>
                <p className="lead">Tu pedido ha sido procesado exitosamente.</p>
                <p>Te hemos enviado un correo de confirmación.</p>
                <Link to="/" className="btn btn-primary mt-4">Volver al Inicio</Link>
            </div>
        </main>
    );
}

export default CompraExitosa;