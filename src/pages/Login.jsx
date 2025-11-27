import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await login(username, password);

            const roles = data.roles || [];
            let targetPath = '/catalogo';

            if (roles.includes('ROLE_ADMIN')) {
                targetPath = '/admin';
            } else if (roles.includes('ROLE_VENDEDOR')) {
                targetPath = '/vendor';
            }

            setError({ message: `¡Inicio de sesión exitoso! Redireccionando...`, type: 'success' });

            setTimeout(() => {
                navigate(targetPath);
            }, 1500);

        } catch (err) {
            console.error("Error en login:", err);
            let errorMsg = "Error al iniciar sesión.";

            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            } else if (err.message) { // Capturamos el error manual del Contexto
                errorMsg = err.message;
            }

            setError({ message: errorMsg, type: 'danger' });
            setLoading(false);
        }
    };

    return (
        <main className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <h2 className="section-title mb-4 text-center">Iniciar Sesión</h2>
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
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Ingresando...' : 'Ingresar'}
                            </button>
                        </form>
                        {error && (
                            <div id="divError" className={`alert alert-${error.type} mt-3`}>
                                {error.message}
                            </div>
                        )}
                        <p className="text-center mt-3 text-white-50">
                            ¿No tienes una cuenta? <Link to="/registro" className="footer-link">Regístrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;