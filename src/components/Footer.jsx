import React from 'react';
import { Link } from 'react-router-dom'; 

function Footer() {
    return (
        <footer className="py-5 bg-light text-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">PC Builder</h5>
                        <p className="text-muted">Tu tienda de confianza para armar el PC de tus sueños.</p>
                    </div>
                    <div className="col-6 col-lg-2 col-md-4 mb-4">
                        <h5 className="fw-bold">Mundo PC</h5>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="footer-link">Gamer Zone</Link></li>
                            <li><Link to="#" className="footer-link">Outlet</Link></li>
                            <li><Link to="#" className="footer-link">Novedades</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-3 col-md-4 mb-4">
                        <h5 className="fw-bold">Necesitas Ayuda</h5>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="footer-link">Centro de Ayuda</Link></li>
                            <li><Link to="#" className="footer-link">Estado de mi Despacho</Link></li>
                            <li><Link to="#" className="footer-link">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-12 mb-4 text-md-start text-lg-start">
                        <h5 className="fw-bold">Contacto</h5>
                        <ul className="list-unstyled">
                            <li className="text-muted"><i className="bi bi-telephone-fill me-2"></i>Ventas: +56 2 2560 0040</li>
                            <li className="text-muted"><i className="bi bi-geo-alt-fill me-2"></i>Encuentra tu tienda</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="text-center text-body-secondary">&copy; 2025 PC Builder. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;