const url = "https://financialmodelingprep.com/api/v3/search?query=AA&apikey=stHIvvuH0NAkvTB1RDAlLDZFwSCS8BOy";

const obtenerDatos = async  () =>{
    try{
        const response = await fetch (url);

        if(!response.ok){
            throw new Error("Error en la respuesta de la API")
        }
        const data = await response.json();
        console.log("datos recibidos", data)
        Mostrarresultados(data);

    }catch(error){
        console.log("error capturado", error,menssage);
    }
}

obtenerDatos()

const Mostrarresultados = (data) =>{
    if (data.length==0){
        console.log("master no hay datos")
        return
    }
    
    data.forEach(item => {
        console.log(`
------ Resultado ------
Nombre:  ${item.name}
Símbolo: ${item.symbol}
Tipo:    ${item.type}
Región:  ${item.region}
-----------------------
        `)
        
    });
}

export default obtenerDatos;