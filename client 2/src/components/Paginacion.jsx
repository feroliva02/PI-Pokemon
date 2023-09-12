import "./estilos/Paginacion.css"

const Paginacion = ({ nPaginas, pagina, setPagina }) => {

    const next = () => {
        if (pagina !== nPaginas) setPagina(pagina + 1)
    }

    const prev = () => {
        if (pagina !== 1) setPagina(pagina - 1)
    }

    return (
        <div className="contenedor">
            <button className="button_next" onClick={prev}>
                <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l192-192c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L77.3 256l169.3 169.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-192-192z">
                    </path>
                </svg>
                <span>Prev</span>
            </button>
            <h3> {pagina} / {nPaginas}</h3>
            <button className="button_next" onClick={next}><span>Next</span>
                <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z">
                    </path>
                </svg>
            </button>
        </div>
    )
}

export default Paginacion