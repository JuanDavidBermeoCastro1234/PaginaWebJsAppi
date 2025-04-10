import {detenerIntervalo } from "./main.js";

const input = document.querySelector("#searchInput");
const button = document.querySelector("#search");

button.addEventListener("click", buscarAccion);

async function buscarAccion() {
    // Detener las actualizaciones automáticas
    detenerIntervalo();
    const texto = input.value.trim().toUpperCase();


    if (texto === "") {
        alert("Escribe un símbolo o nombre para buscar");
        return;

    }
    mostrarResultadosFiltrados(topAccion);
    
    try {
    
    let url = `https://financialmodelingprep.com/api/v3/stock-screener?limit=150&companyName=${texto}&apikey=fdIy9mtUHCm8rQOxO0xicwv3WLuta7w5`;

    let response = await fetch(url);
    let data = await response.json();

    if(data.length===0){

        
        url = "https://financialmodelingprep.com/api/v3/stock-screener?limit=150&apikey=fdIy9mtUHCm8rQOxO0xicwv3WLuta7w5";
        
        response = await fetch(url);
        data = await response.json();
        
        
        const resultadosFiltrados = data.filter(item =>
            item.symbol.toUpperCase().includes(texto) ||
            (item.companyName && item.companyName.toUpperCase().includes(texto))
        );
    
        // 
        if (resultadosFiltrados.length === 0) {
            document.querySelector("#resultado").innerHTML = `<p>No se encontraron resultados.</p>`;
            return;
        }
    }
    const topAcciones = resultadosFiltrados.sort((a, b) => b.price - a.price);
        
        mostrarResultadosFiltrados(topAcciones);
        
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
};

export {mostrarResultadosFiltrados}