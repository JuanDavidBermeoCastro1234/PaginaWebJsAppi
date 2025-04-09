import {detenerIntervalo } from "./main.js";

const input = document.querySelector("#searchInput");
const button = document.querySelector("#search");

button.addEventListener("click", buscarAccion);

async function buscarAccion() {
    const texto = input.value.trim().toUpperCase();

    if (texto === "") {
        alert("Escribe un símbolo o nombre para buscar");
        return;
    }

    // Detener las actualizaciones automáticas
    detenerIntervalo();

    const url = `https://financialmodelingprep.com/api/v3/search?query=${texto}&apikey=stHIvvuH0NAkvTB1RDAlLDZFwSCS8BOy`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            document.querySelector("#resultado").innerHTML = `<p>No se encontraron resultados.</p>`;
            return;
        }

        mostrarResultadosFiltrados(data);

    } catch (error) {
        console.log("Error buscando accion:", error.message);
    }
}

const mostrarResultadosFiltrados = (data) => {
    const container = document.querySelector("#resultado");
    container.innerHTML = ""; // limpiar anteriores

    data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h2>${item.name}</h2>
            <p><strong>Simbolo:</strong> ${item.symbol}</p>
            <p><strong>Tipo:</strong> ${item.type || "N/A"}</p>
            <p><strong>Region:</strong> ${item.region || "N/A"}</p>
        `;

        container.appendChild(div);
    });
};

export {mostrarResultadosFiltrados}