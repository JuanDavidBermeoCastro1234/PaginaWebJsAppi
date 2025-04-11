# 📈 Buscador de Acciones - Proyecto Progresivo JavaScript

Este proyecto es una aplicación web que permite **buscar acciones bursátiles** en tiempo real utilizando datos de la API de [Financial Modeling Prep](https://financialmodelingprep.com/). También muestra las **3 acciones más valiosas automáticamente**, y ofrece una **interfaz responsiva** e interactiva desarrollada con **HTML, CSS y JavaScript**.

---

## 🚀 Funcionalidades

- 🔍 Buscar acciones por símbolo o nombre parcial/completo (ej: `AAPL`, `Tesla`).
- 🧠 Detección automática al presionar Enter o al hacer clic en el botón.
- 🥇 Muestra inicial de las 3 acciones más valiosas ordenadas por precio.
- 🕒 Actualización automática cada 20 segundos (hasta que se hace una búsqueda).
- 📱 Interfaz responsiva para móviles y escritorio.
- 🌐 Consumo de datos en tiempo real desde una API pública.
- 💾 LocalStorage listo para futuras expansiones (almacenamiento no implementado aún).

---

## 🧪 Tecnologías utilizadas

- **HTML5**: Estructura del sitio.
- **CSS3**: Estilos responsivos con clases adaptables a diferentes tamaños.
- **JavaScript (ES Modules)**: Lógica del negocio, eventos y consumo del API.
- **API Pública**: [Financial Modeling Prep](https://financialmodelingprep.com/)

---
### 🔁 Componente Automático
El archivo `main.js` consulta las 150 principales acciones y muestra las 3 de mayor precio. Este proceso se repite cada 20 segundos. Si el usuario hace una búsqueda, se detiene.

### 🔍 Componente de Búsqueda
En `buscador.js`:
- Se captura el texto introducido.
- Se normaliza (sin tildes, en mayúscula).
- Se filtra localmente entre las 150 acciones.
- Se muestran coincidencias exactas o similares ordenadas por precio.
- También responde al presionar la tecla **Enter**.

---

## 🛠️ Instrucciones de uso

1. Clona el repositorio:
   ```bash
   git https://github.com/JuanDavidBermeoCastro1234/PaginaWebJsAppi.git
