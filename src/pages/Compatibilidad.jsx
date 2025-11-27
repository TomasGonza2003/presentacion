import React, { useState } from 'react';

function Compatibilidad() {
    const [cpu, setCpu] = useState('');
    const [placaMadre, setPlacaMadre] = useState('');
    const [ram, setRam] = useState('');
    const [gpu, setGpu] = useState('');
    
    const [resultado, setResultado] = useState(null);

    const handleSubmit = (evento) => {
        evento.preventDefault();
        
        let mensajes = [];
        let esCompatible = true;

        if ((cpu.includes('lga1700') && !placaMadre.includes('lga1700')) || (cpu.includes('am5') && !placaMadre.includes('am5'))) {
            esCompatible = false;
            mensajes.push('<b>Error:</b> El procesador no es compatible con la placa madre.');
        }

        if ((ram === 'ddr5' && !placaMadre.includes('ddr5')) || (ram === 'ddr4' && !placaMadre.includes('ddr4'))) {
            esCompatible = false;
            mensajes.push('<b>Error:</b> La memoria RAM no es compatible con la placa madre.');
        }
        
        if (gpu === 'high-end') {
            mensajes.push('<b>Recomendación:</b> Para esa tarjeta gráfica, asegúrate de tener una fuente de poder de 850W o más.');
        }

        const mensajeHtml = mensajes.join('<br>');

        if (esCompatible) {
            setResultado(
                <div className="alert alert-success">
                    ¡Felicidades! Tus componentes son compatibles.
                    {mensajes.length > 0 && <hr />}
                    <span dangerouslySetInnerHTML={{ __html: mensajeHtml }} />
                </div>
            );
        } else {
            setResultado(
                <div className="alert alert-danger">
                    ¡Cuidado! Hay problemas de compatibilidad.
                    <hr />
                    <span dangerouslySetInnerHTML={{ __html: mensajeHtml }} />
                </div>
            );
        }
    };

    return (
        <main className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="section-title mb-4">Verificador de Compatibilidad</h2>
                    <form onSubmit={handleSubmit} className="p-4 rounded-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <div className="mb-3">
                            <label htmlFor="cpu" className="form-label">Procesador (CPU)</label>
                            <select id="cpu" className="form-select" value={cpu} onChange={(e) => setCpu(e.target.value)} required>
                                <option value="" disabled>Elige un procesador...</option>
                                <option value="intel-lga1700">Intel Core i9 (Socket LGA 1700)</option>
                                <option value="amd-am5">AMD Ryzen 9 (Socket AM5)</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="placaMadre" className="form-label">Placa Madre (Motherboard)</label>
                            <select id="placaMadre" className="form-select" value={placaMadre} onChange={(e) => setPlacaMadre(e.target.value)} required>
                                <option value="" disabled>Elige una placa madre...</option>
                                <option value="intel-lga1700-ddr5">Motherboard Z790 (LGA 1700, DDR5)</option>
                                <option value="amd-am5-ddr5">Motherboard X670 (AM5, DDR5)</option>
                                <option value="intel-lga1700-ddr4">Motherboard B660 (LGA 1700, DDR4)</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ram" className="form-label">Memoria RAM</label>
                            <select id="ram" className="form-select" value={ram} onChange={(e) => setRam(e.target.value)} required>
                                <option value="" disabled>Elige la memoria RAM...</option>
                                <option value="ddr5">DDR5</option>
                                <option value="ddr4">DDR4</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gpu" className="form-label">Tarjeta Gráfica (GPU)</label>
                            <select id="gpu" className="form-select" value={gpu} onChange={(e) => setGpu(e.target.value)} required>
                                <option value="" disabled>Elige una tarjeta gráfica...</option>
                                <option value="high-end">NVIDIA GeForce RTX 4090</option>
                                <option value="mid-range">NVIDIA GeForce RTX 4060</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Verificar Compatibilidad</button>
                    </form>
                    {/* Aquí se mostrará el resultado */}
                    <div id="divResultado" className="mt-4">
                        {resultado}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Compatibilidad;