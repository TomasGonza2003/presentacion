import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

function Catalogo() {
    const { products, loading } = useProducts();
    const [filtro, setFiltro] = useState('todos');

    // Lógica de filtrado
    // Si el filtro es 'todos', mostramos todo. Si no, buscamos coincidencias en el nombre.
    const productosFiltrados = filtro === 'todos'
        ? products
        : products.filter(p => p.name.toLowerCase().includes(filtro));

    if (loading) {
        return <div className="text-center py-5" style={{ marginTop: '56px' }}>Cargando productos...</div>;
    }

    return (
        <main className="py-5" style={{ marginTop: '56px' }}>
            <div className="container">
                <h1 className="section-title mb-4">Nuestro Catálogo</h1>

                <section className="mb-5">
                    <h4 className="mb-3 text-white-50">Filtrar por Categoría:</h4>
                    <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
                        <button
                            className={`btn ${filtro === 'todos' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setFiltro('todos')}
                        >
                            Todas
                        </button>
                        <button
                            className={`btn ${filtro === 'nvidia' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setFiltro('nvidia')}
                        >
                            NVIDIA
                        </button>
                        <button
                            className={`btn ${filtro === 'amd' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setFiltro('amd')}
                        >
                            AMD
                        </button>
                        <button
                            className={`btn ${filtro === 'monitor' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setFiltro('monitor')}
                        >
                            Monitores
                        </button>
                        <button
                            className={`btn ${filtro === 'mouse' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setFiltro('mouse')}
                        >
                            Periféricos
                        </button>
                    </div>
                </section>

                {/* --- LISTADO DE PRODUCTOS --- */}
                <div id="catalog-product-list" className="row g-4">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(product => (
                            <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                                <ProductCard producto={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <i className="bi bi-search fs-1 text-muted mb-3"></i>
                            <p className="text-muted fs-5">No se encontraron productos en esta categoría.</p>
                            <button className="btn btn-outline-primary mt-2" onClick={() => setFiltro('todos')}>
                                Ver todos los productos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Catalogo;