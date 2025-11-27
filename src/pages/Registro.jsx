import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Registro() {
    const [username, setUsername] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError({ message: 'Las contraseñas no coinciden.', type: 'danger' });
            return;
        }

        setLoading(true);

        try {
            await AuthService.register(username, correo, password);

            setError({ message: '¡Registro exitoso! Redireccionando...', type: 'success' });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error("Error en registro:", err);

            const errorMsg = err.response?.data?.message || err.message || "Ocurrió un error al registrarse.";

            setError({ message: errorMsg, type: 'danger' });
            setLoading(false);
        }
    };

    return (
        <main className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <h2 className="section-title mb-4 text-center">Crear Cuenta</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    minLength={3}
                                    maxLength={20}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="correo"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirm-password" className="form-label">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                        </form>

                        {error && (
                            <div className={`alert alert-${error.type} mt-3`} role="alert">
                                {error.message}
                            </div>
                        )}

                        <p className="text-center mt-3 text-white-50">
                            ¿Ya tienes una cuenta? <Link to="/login" className="footer-link">Inicia Sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Registro;