import React, { useState } from 'react';

function Contacto() {
    const [nombre, setNombre] = useState('');

    const handleSubmit = (evento) => {
        evento.preventDefault(); 
        
        if (nombre === "") {
            alert("Por favor, escribe tu nombre.");
            return;
        }
        
        alert(`¡Gracias por tu mensaje, ${nombre}! Te contactaremos pronto.`);
        
        // Limpiamos el formulario reseteando el estado y el form
        setNombre('');
        evento.target.reset();
    };

    return (
        <main className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="section-title mb-4">Contáctanos</h2>
                    <form onSubmit={handleSubmit} id="formulario-contacto" className="p-4 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                className="form-control" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                            <input type="email" id="correo" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Número de Teléfono</label>
                            <input type="tel" id="telefono" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mensaje" className="form-label">Mensaje</label>
                            <textarea id="mensaje" rows="5" className="form-control" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Contacto;