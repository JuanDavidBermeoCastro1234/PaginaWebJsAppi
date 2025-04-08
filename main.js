
const url = "https://financialmodelingprep.com/api/v3/search?query=AA&apikey=stHIvvuH0NAkvTB1RDAlLDZFwSCS8BOy";



fetch (url)
.then (response =>{
    if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
  return response.json();
})
.then(data => {
    console.log("datos recibidos", data);
    Mostrarresultados(data);
})
.catch(error => {
    console.error("he capturado el error ")
});

const Mostrarresultados = (data) =>{
    if(data.length===0){
        console.log("master no hay datos")
        return;
    }
    data.forEach(item => {
        console.log(`
        
------ Resultado ------
Nombre:  ${item.name}
Símbolo: ${item.symbol}
Tipo:    ${item.type}
Región:  ${item.region}
-----------------------`)
    });
}
    // Obtener el contenedor desde el HTML donde se va a insertar la tabla
    // const contenedor = document.getElementById("contenedor")