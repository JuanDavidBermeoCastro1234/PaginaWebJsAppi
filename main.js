import { mostrarResultadosFiltrados} from "./buscador.js";

const container = document.querySelector("#resultado");
let intervalID = null;

const obtenerTopAcciones = async () => {
    const url = "https://financialmodelingprep.com/api/v3/stock-screener?limit=150&apikey=stHIvvuH0NAkvTB1RDAlLDZFwSCS8BOy";
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("DATOS",data)

        // Ordenar por precio y tomar las 3 primeras
        const topAcciones = data
            .filter(item => item.price) // asegurarse que tenga precio
            .sort((a, b) => b.price - a.price)
            .slice(0, 3);

        mostrarTop(topAcciones);

    } catch (error) {
        console.log("Error obteniendo top acciones", error.message);
    }
};

const mostrarTop = (acciones) => {
    container.innerHTML = ""; // limpiar antes de renderizar

    acciones.forEach(item => {
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

const iniciarIntervalo = () => {
    obtenerTopAcciones(); // primera vez
    intervalID = setInterval(obtenerTopAcciones, 20000); // cada 20 seg
};
// esto llama la funcon para que ejecute y muestre las tres primeras acciones 
iniciarIntervalo()

const detenerIntervalo = () => {
    if (intervalID) {
        clearInterval(intervalID);
    }
};

export {detenerIntervalo}

// tengo todo lo que quieren las wachas

mostrarResultadosFiltrados()