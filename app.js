// Datos de ejemplo: progreso de carga en 12 semanas
const data = {
    'press_banca': [
        { week: 1, weight: 50 },
        { week: 2, weight: 55 },
        { week: 3, weight: 60 },
        { week: 4, weight: 65 },
        { week: 5, weight: 70 },
        { week: 6, weight: 75 },
        { week: 7, weight: 80 },
        { week: 8, weight: 85 },
        { week: 9, weight: 90 },
        { week: 10, weight: 95 },
        { week: 11, weight: 100 },
        { week: 12, weight: 105 },
    ],
    'peso_muerto': [
        { week: 1, weight: 100 },
        { week: 2, weight: 105 },
        { week: 3, weight: 110 },
        { week: 4, weight: 115 },
        { week: 5, weight: 120 },
        { week: 6, weight: 125 },
        { week: 7, weight: 130 },
        { week: 8, weight: 135 },
        { week: 9, weight: 140 },
        { week: 10, weight: 145 },
        { week: 11, weight: 150 },
        { week: 12, weight: 155 },
    ],
    'press_militar': [
        { week: 1, weight: 30 },
        { week: 2, weight: 35 },
        { week: 3, weight: 40 },
        { week: 4, weight: 45 },
        { week: 5, weight: 50 },
        { week: 6, weight: 55 },
        { week: 7, weight: 60 },
        { week: 8, weight: 65 },
        { week: 9, weight: 70 },
        { week: 10, weight: 75 },
        { week: 11, weight: 80 },
        { week: 12, weight: 85 },
    ]
};

// Dimensiones de la gráfica
const width = 800;
const height = 500;
const margin = { top: 30, right: 30, bottom: 40, left: 40 };

// Escalas
const x = d3.scaleLinear()
    .domain([1, 12]) // 12 semanas
    .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
    .domain([0, 170]) // Rango de pesos (ajustar según tus datos)
    .range([height - margin.bottom, margin.top]);

// Crear el lienzo SVG
const svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

// Función para dibujar la línea
function drawLine(data, color) {
    const line = d3.line()
        .x(d => x(d.week))
        .y(d => y(d.weight));

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", color)
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .attr("stroke-linecap", "round");  // Líneas con bordes redondeados
}

// Dibujar las líneas de cada ejercicio
drawLine(data.press_banca, "#1f77b4");
drawLine(data.peso_muerto, "#e67e22");
drawLine(data.press_militar, "#2ecc71");

// Añadir los puntos sobre la línea
function addPoints(data, color) {
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.week))
        .attr("cy", d => y(d.weight))
        .attr("r", 6)
        .attr("fill", color)
        .on("mouseover", function (event, d) {
            d3.select(this).transition()
                .duration(200)
                .attr("r", 8)
                .attr("fill", "#e74c3c");

            svg.append("text")
                .attr("x", x(d.week) + 10)
                .attr("y", y(d.weight) - 10)
                .attr("id", "tooltip")
                .style("fill", "#fff")
                .style("font-size", "12px")
                .text(`Semana ${d.week}: ${d.weight} kg`);
        })
        .on("mouseout", function () {
            d3.select(this).transition()
                .duration(200)
                .attr("r", 6)
                .attr("fill", color);

            svg.select("#tooltip").remove();
        });
}

// Añadir puntos de cada ejercicio
addPoints(data.press_banca, "#1f77b4");
addPoints(data.peso_muerto, "#e67e22");
addPoints(data.press_militar, "#2ecc71");

// Añadir los ejes
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .attr("class", "axis");

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .attr("class", "axis");
