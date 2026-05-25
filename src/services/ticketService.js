const calcularPrioridad = (impacto, urgencia, categoria, tiempoEstimado) => {
    let puntos = 0;
    puntos += impacto + urgencia; 
    if (categoria === 'red' || categoria === 'cuenta') puntos += 1;
    if (tiempoEstimado > 4) puntos += 1;

    if (puntos <= 3) return 'Baja';
    if (puntos <= 5) return 'Media';
    if (puntos === 6) return 'Alta';
    return 'Crítica';
};

module.exports = { calcularPrioridad }; // Agrega esta línea al final