/* script.js */

const API_URL = 'http://localhost:3000';

// Verificar login al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        mostrarApp();
    }
});

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        mostrarApp();
    } else {
        alert('Credenciales incorrectas');
    }
});

function logout() {
    localStorage.removeItem('token');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('list-section').style.display = 'none';
    document.getElementById('btnLogout').style.display = 'none';
}

function mostrarApp() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
    document.getElementById('list-section').style.display = 'block';
    document.getElementById('btnLogout').style.display = 'inline-block';
    cargarTickets();
}

// CREAR TICKET
document.getElementById('ticketForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    const ticketData = {
        nombreSolicitante: document.getElementById('nombreSolicitante').value,
        correo: document.getElementById('correo').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        impacto: parseInt(document.getElementById('impacto').value),
        urgencia: parseInt(document.getElementById('urgencia').value),
        tiempoEstimado: parseInt(document.getElementById('tiempoEstimado').value)
    };

    const res = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(ticketData)
    });

    if (res.ok) {
        alert('Ticket creado con éxito');
        document.getElementById('ticketForm').reset();
        cargarTickets();
    } else {
        const err = await res.json();
        alert('Error: ' + err.error);
    }
});

// LISTAR TICKETS
async function cargarTickets() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/tickets`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        const tickets = await res.json();
        const container = document.getElementById('ticketsContainer');
        container.innerHTML = '';

        tickets.forEach(ticket => {
            const fecha = new Date(ticket.fechaCreacion).toLocaleString('es-ES');
            container.innerHTML += `
                <div class="ticket-card prioridad-${ticket.prioridad}">
                    <h3>${ticket.descripcion} - <small>${ticket.categoria.toUpperCase()}</small></h3>
                    <p><strong>Solicitante:</strong> ${ticket.nombreSolicitante} (${ticket.correo})</p>
                    <p><strong>Estado:</strong> ${ticket.estado} | <strong>Prioridad:</strong> ${ticket.prioridad}</p>
                    <p><small>Creado: ${fecha}</small></p>
                    <div class="card-actions">
                        <button class="btn-update" onclick="actualizarEstado('${ticket.id}')">Marcar Resuelto</button>
                        <button class="btn-delete" onclick="eliminarTicket('${ticket.id}')">Eliminar</button>
                    </div>
                </div>
            `;
        });
    } else {
        logout(); // Si el token falla
    }
}

// ACTUALIZAR TICKET
async function actualizarEstado(id) {
    const token = localStorage.getItem('token');
    const ticket = await fetch(`${API_URL}/tickets/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const ticketData = await ticket.json();

    if(ticketData.estado === 'resuelto') {
        alert('Este ticket ya está resuelto.');
        return;
    }

    await fetch(`${API_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ estado: 'resuelto' })
    });
    cargarTickets();
}

// ELIMINAR TICKET
async function eliminarTicket(id) {
    if(!confirm('¿Seguro que deseas eliminar este ticket?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/tickets/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    cargarTickets();
}