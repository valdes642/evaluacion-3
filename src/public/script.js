const API_URL = 'http://localhost:3000';

// Elementos del DOM
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const vistaRegistrarTicket = document.getElementById('vista-registrar-ticket');
const vistaListaTickets = document.getElementById('vista-lista-tickets');
const loginForm = document.getElementById('loginForm');
const ticketForm = document.getElementById('ticketForm');

// Botones de navegación
const btnVerTickets = document.getElementById('btn-ver-tickets');
const btnVolverCrear = document.getElementById('btn-volver-crear');
const btnLogout = document.getElementById('btnLogout');

// 1. Verificar sesión
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        mostrarApp();
    }
});

// 2. Lógica del Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            mostrarApp();
        } else {
            document.getElementById('login-error').textContent = data.error;
            document.getElementById('login-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error de login:', error);
    }
});

// 3. Lógica Formulario Ticket (Alineado con MySQL)
if (ticketForm) {
    ticketForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Estos IDs deben coincidir con tus <input> en el HTML
        const ticketData = {
            nombreSolicitante: document.getElementById('nombreSolicitante').value,
            correo: document.getElementById('correo').value,
            categoria: document.getElementById('categoria').value,
            descripcion: document.getElementById('descripcion').value,
            impacto: document.getElementById('impacto').value,
            urgencia: document.getElementById('urgencia').value,
            tiempoEstimado: document.getElementById('tiempoEstimado').value,
            prioridad: document.getElementById('prioridad').value,
            estado: 'pendiente'
        };

        // ... luego en el fetch:
        body: JSON.stringify(ticketData)

        try {
            const response = await fetch(`${API_URL}/tickets`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(ticketData)
            });

            if (response.ok) {
                alert('Ticket creado exitosamente');
                ticketForm.reset();
                vistaRegistrarTicket.style.display = 'none';
                vistaListaTickets.style.display = 'block';
                cargarTickets();
            } else {
                const error = await response.json();
                alert('Error al crear ticket: ' + (error.message || error.error));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión al crear el ticket');
        }
    });
}

// 4. Navegación
if (btnVerTickets) {
    btnVerTickets.addEventListener('click', () => {
        vistaRegistrarTicket.style.display = 'none';
        vistaListaTickets.style.display = 'block';
        cargarTickets();
    });
}

if (btnVolverCrear) {
    btnVolverCrear.addEventListener('click', () => {
        vistaListaTickets.style.display = 'none';
        vistaRegistrarTicket.style.display = 'block';
    });
}

// 5. Cerrar sesión
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token');
    loginView.style.display = 'block';
    appView.style.display = 'none';
});

function mostrarApp() {
    loginView.style.display = 'none';
    appView.style.display = 'block';
    vistaRegistrarTicket.style.display = 'block';
    vistaListaTickets.style.display = 'none';
}

// 6. Cargar Tickets
async function cargarTickets() {
    try {
        const response = await fetch(`${API_URL}/tickets`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        const tickets = await response.json();
        const contenedor = document.getElementById('tickets-container');
        contenedor.innerHTML = '';

        if (!tickets || tickets.length === 0) {
            contenedor.innerHTML = '<p>No hay tickets creados actualmente.</p>';
            return;
        }

        tickets.forEach(ticket => {
            const div = document.createElement('div');
            div.className = "ticket-card"; // Puedes dar estilo a esta clase en tu CSS
            div.style.border = "1px solid #ccc";
            div.style.margin = "10px 0";
            div.style.padding = "10px";
            
            div.innerHTML = `
                <h3>Ticket #${ticket.id}</h3>
                <p><strong>Solicitante:</strong> ${ticket.nombreSolicitante}</p>
                <p><strong>Categoría:</strong> ${ticket.categoria}</p>
                <p><strong>Descripción:</strong> ${ticket.descripcion}</p>
                <p><strong>Estado:</strong> ${ticket.estado}</p>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}