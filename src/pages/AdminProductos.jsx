import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';

function AdminProductos() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoActual, setProductoActual] = useState({ id: null, name: '', price: '', description: '', imageUrl: '' });

    const eliminarProducto = (id) => {
        if (window.confirm('¿Eliminar producto?')) {
            deleteProduct(id);
        }
    };

    const editarProducto = (producto) => {
        setModoEdicion(true);
        setProductoActual(producto);
    };

    const guardarProducto = (e) => {
        e.preventDefault();
        // Ensure price is a number
        const productToSave = { ...productoActual, price: parseInt(productoActual.price) };

        if (modoEdicion) {
            updateProduct(productToSave);
        } else {
            addProduct(productToSave);
        }
        setModoEdicion(false);
        setProductoActual({ id: null, name: '', price: '', description: '', imageUrl: '' });
    };

    return (
        <main className="container py-5 mt-5">
            <h2 className="section-title mb-4">Gestión de Productos</h2>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <h4>{modoEdicion ? 'Editar' : 'Nuevo'} Producto</h4>
                        <form onSubmit={guardarProducto}>
                            <div className="mb-2">
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={productoActual.name} onChange={e => setProductoActual({ ...productoActual, name: e.target.value })} required />
                            </div>
                            <div className="mb-2">
                                <label>Descripción</label>
                                <input type="text" className="form-control" value={productoActual.description || ''} onChange={e => setProductoActual({ ...productoActual, description: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <label>Precio</label>
                                <input type="number" className="form-control" value={productoActual.price} onChange={e => setProductoActual({ ...productoActual, price: e.target.value })} required />
                            </div>
                            <div className="mb-2">
                                <label>URL Imagen</label>
                                <input type="text" className="form-control" value={productoActual.imageUrl || ''} onChange={e => setProductoActual({ ...productoActual, imageUrl: e.target.value })} />
                            </div>
                            <button className="btn btn-primary w-100 mt-2">{modoEdicion ? 'Actualizar' : 'Crear'}</button>
                            {modoEdicion && <button type="button" onClick={() => { setModoEdicion(false); setProductoActual({ id: null, name: '', price: '', description: '', imageUrl: '' }); }} className="btn btn-secondary w-100 mt-2">Cancelar</button>}
                        </form>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>${p.price.toLocaleString('es-CL')}</td>
                                        <td>
                                            <button onClick={() => editarProducto(p)} className="btn btn-sm btn-warning me-2"><i className="bi bi-pencil"></i></button>
                                            <button onClick={() => eliminarProducto(p.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminProductos;