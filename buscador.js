import {obtenerTopAcciones, detenerIntervalo } from "./main.js";

const input = document.querySelector("#searchInput");
const button = document.querySelector("#search");

button.addEventListener("click", buscarAccion);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        buscarAccion();
    }
});

// Normaliza texto eliminando tildes, mayúsculas y espacios extras
const normalizarTexto = (texto) => {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .trim();
};

async function buscarAccion() {
    detenerIntervalo();
    const texto = normalizarTexto(input.value);

    if (texto === "") {
        alert("Escribe un simbolo o nombre para buscar");
        return;
    }

    guardarBusquedaEnHistorial(texto);


    try {
        const url = "https://financialmodelingprep.com/api/v3/stock-screener?apikey=stHIvvuH0NAkvTB1RDAlLDZFwSCS8BOy";
        const response = await fetch(url);
        const data = await response.json();
        console.log("resultados que trae la busqueda", data)
        // Coincidencias exactas
        const exactos = data.filter(item => {
            const simbolo = normalizarTexto(item.symbol || "");
            const nombre = normalizarTexto(item.companyName || "");
            return simbolo === texto || nombre === texto;
        });

        // Si no hay exactos, buscar coincidencias parciales
        const similares = data.filter(item => {
            const simbolo = normalizarTexto(item.symbol || "");
            const nombre = normalizarTexto(item.companyName || "");
            return simbolo.includes(texto) || nombre.includes(texto);
        });

        const resultados = exactos.length > 0 ? exactos : similares;

        if (resultados.length === 0) {
            const container = document.querySelector("#resultado")
            container.innerHTML=
            `<p>No se encontraron resultados.</p>`;
            crearBotonVolver()
            return;
        }

        const ordenadas = resultados
            .filter(item => item.price)
            .sort((a, b) => b.price - a.price);

        mostrarResultadosFiltrados(ordenadas);

    } catch (error) {
        console.log("Error buscando accion:", error.message);
    }
}

const mostrarResultadosFiltrados = (data) => {
    const container = document.querySelector("#resultado");
    container.innerHTML = ""; // limpiar anteriores

    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${item.companyName || item.symbol}</h2>
            <p><strong>Simbolo:</strong> ${item.symbol}</p>
            <p><strong>Precio:</strong> $${item.price}</p>
            <p><strong>Sector:</strong> ${item.sector || "N/A"}</p>
        `;

        container.appendChild(card);
    });

    crearBotonVolver()

};

function guardarBusquedaEnHistorial(texto) {
    let historial = JSON.parse(localStorage.getItem("historialBusquedas")) || [];
    
    historial.push({
        termino: texto,
        fecha: new Date().toISOString()
    });

    localStorage.setItem("historialBusquedas", JSON.stringify(historial));
}

const crearBotonVolver = () => {
    const container = document.querySelector("#resultado");
    
    const volverBtn = document.createElement("button");
    volverBtn.textContent = "Volver al inicio";
    volverBtn.classList.add("buttonSearch");
    volverBtn.style.marginTop = "2rem";

    volverBtn.addEventListener("click", () => {
        container.innerHTML = "";
        obtenerTopAcciones();
        window.scrollTo({ top: 0, behavior: "smooth" }); // hace scroll arriba
    });

    container.appendChild(volverBtn);
};


export { mostrarResultadosFiltrados };
