const calcularPrioridad = (impacto, urgencia, categoria, tiempoEstimado) => {
    const ptImpacto = { bajo: 1, medio: 2, alto: 3 }[impacto] || 1; // [cite: 57, 58, 59]
    const ptUrgencia = { baja: 1, media: 2, alta: 3 }[urgencia] || 1; // [cite: 61, 62, 63]
    
    let bonusCategoria = (categoria === 'red' || categoria === 'cuenta') ? 1 : 0; // [cite: 65]
    let bonusTiempo = (tiempoEstimado > 4) ? 1 : 0; // [cite: 66]

    const puntajeTotal = ptImpacto + ptUrgencia + bonusCategoria + bonusTiempo; // [cite: 68]

    if (puntajeTotal <= 3) return 'Baja'; // [cite: 71]
    if (puntajeTotal <= 5) return 'Media'; // [cite: 72]
    if (puntajeTotal === 6) return 'Alta'; // [cite: 73, 74]
    return 'Crítica'; // [cite: 75]
};

module.exports = { calcularPrioridad };