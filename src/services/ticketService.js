const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/tickets.json');

// Lee los tickets
const getTickets = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
// Guarda los tickets
const saveTickets = (tickets) => fs.writeFileSync(dataPath, JSON.stringify(tickets, null, 2));

// Algoritmo de Priorización [cite: 54, 55, 64, 67]
const calcularPrioridad = (impacto, urgencia, categoria, tiempoEstimado) => {
    let puntos = Number(impacto) + Number(urgencia); 
    
    // Reglas adicionales [cite: 64]
    if (categoria === 'red' || categoria === 'cuenta') puntos += 1; // [cite: 65]
    if (Number(tiempoEstimado) > 4) puntos += 1; // [cite: 66]

    // Resultado esperado [cite: 69]
    if (puntos <= 3) return 'Baja'; // 1 a 3 [cite: 71]
    if (puntos <= 5) return 'Media'; // 4 a 5 [cite: 72]
    if (puntos === 6) return 'Alta'; // 6 [cite: 73, 74]
    return 'Crítica'; // 7 o más [cite: 75]
};

const getTicketById = (id) => getTickets().find(t => t.id === id);

const createTicket = (data) => {
    const tickets = getTickets();
    const nuevoTicket = {
        id: uuidv4(), // Identificador único [cite: 33]
        ...data,
        estado: 'pendiente', // Estado inicial [cite: 50]
        prioridad: calcularPrioridad(data.impacto, data.urgencia, data.categoria, data.tiempoEstimado), // [cite: 51]
        fechaCreacion: new Date().toISOString() // Fecha [cite: 52]
    };
    tickets.push(nuevoTicket);
    saveTickets(tickets);
    return nuevoTicket;
};

const updateTicket = (id, data) => {
    const tickets = getTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets[index] = { ...tickets[index], ...data };
        saveTickets(tickets);
        return tickets[index];
    }
    return null;
};

const deleteTicket = (id) => {
    let tickets = getTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets.splice(index, 1);
        saveTickets(tickets);
        return true;
    }
    return false;
};

module.exports = { getTickets, getTicketById, createTicket, updateTicket, deleteTicket, calcularPrioridad };