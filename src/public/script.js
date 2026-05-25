const API_URL = 'http://localhost:3000'; // Ajusta el puerto si es distinto

// Elementos del DOM
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const vistaRegistrarTicket = document.getElementById('vista-registrar-ticket');
const vistaListaTickets = document.getElementById('vista-lista-tickets');
const loginForm = document.getElementById('loginForm');

// Botones de navegación
const btnVerTickets = document.getElementById('btn-ver-tickets');
const btnVolverCrear = document.getElementById('btn-volver-crear');
const btnLogout = document.getElementById('btnLogout');

// 1. Verificar si ya hay sesión iniciada al cargar la página
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
            localStorage.setItem('token', data.token); // Guardamos el token
            mostrarApp(); // Entramos a la app
        } else {
            document.getElementById('login-error').textContent = data.error;
            document.getElementById('login-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// 3. LÓGICA DE LOS BOTONES PARA CAMBIAR DE VISTA
if (btnVerTickets) {
    btnVerTickets.addEventListener('click', () => {
        // Ocultar formulario, mostrar lista
        vistaRegistrarTicket.style.display = 'none';
        vistaListaTickets.style.display = 'block';
        
        // Ejecutar función para traer los datos del servidor
        cargarTickets();
    });
}

if (btnVolverCrear) {
    btnVolverCrear.addEventListener('click', () => {
        // Ocultar lista, mostrar formulario
        vistaListaTickets.style.display = 'none';
        vistaRegistrarTicket.style.display = 'block';
    });
}

// 4. Cerrar sesión
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token');
    loginView.style.display = 'block';
    appView.style.display = 'none';
});

// 5. Funciones auxiliares
function mostrarApp() {
    loginView.style.display = 'none';
    appView.style.display = 'block';
    // Siempre que se entra, se muestra la vista de registro por defecto
    vistaRegistrarTicket.style.display = 'block';
    vistaListaTickets.style.display = 'none';
}

// Función que pide los tickets a tu servidor
async function cargarTickets() {
    try {
        const response = await fetch(`${API_URL}/tickets`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        const tickets = await response.json();
        const contenedor = document.getElementById('tickets-container');
        contenedor.innerHTML = ''; // Limpiar lo que había antes

        if (tickets.length === 0) {
            contenedor.innerHTML = '<p>No hay tickets creados actualmente.</p>';
            return;
        }

        // Crear una "tarjeta" por cada ticket
        tickets.forEach(ticket => {
            const div = document.createElement('div');
            div.style.border = "1px solid #ccc";
            div.style.margin = "10px 0";
            div.style.padding = "10px";
            
            div.innerHTML = `
                <h3>Ticket #${ticket.id || ''}</h3>
                <p><strong>Descripción:</strong> ${ticket.descripcion || 'Sin descripción'}</p>
                <p><strong>Prioridad:</strong> ${ticket.prioridad || 'Baja'}</p>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error('Error cargando los tickets:', error);
    }
}