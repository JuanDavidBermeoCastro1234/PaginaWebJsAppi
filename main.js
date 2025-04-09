// const url = "https://financialmodelingprep.com/api/v3/stock-screener?limit=100&apikey=stHIvvuH0NAkvTB1RDAlLDZFwSCS8BOy";

// const obtenerDatos = async  () =>{
//     try{
//         const response = await fetch (url);

//         if(!response.ok){
//             throw new Error("Error en la respuesta de la API")
//         }
//         const data = await response.json();
//         console.log("datos recibidos", data)
//         Mostrarresultados(data);

//     }catch(error){
//         console.log("error capturado", error.message);
//     }
// }

// // obtenerDatos()

// const Mostrarresultados = (data) =>{
//     if (data.length==0){
//         console.log("master no hay datos")
//         return
//     }
    
//     data.forEach(item => {
//         console.log(`
// ------ Resultado ------
// Nombre:  ${item.name}
// Símbolo: ${item.symbol}
// Tipo:    ${item.type}
// Región:  ${item.region}
// -----------------------
//         `)
        
//     });
// }

// export {Mostrarresultados,obtenerDatos}


/************/ 

const container = document.querySelector("#resultado");
let intervalID = null;

const obtenerTopAcciones = async () => {
    const url = "https://financialmodelingprep.com/api/v3/stock-screener?limit=100&apikey=stHIvvuH0NAkvTB1RDAlLDZFwSCS8BOy";
    try {
        const response = await fetch(url);
        const data = await response.json();

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

const detenerIntervalo = () => {
    if (intervalID) {
        clearInterval(intervalID);
    }
};

export { mostrarTop, detenerIntervalo, iniciarIntervalo };
