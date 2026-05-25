let jwtToken = localStorage.getItem('token') || '';

// Mantener sesión activa si ya hay token
if(jwtToken) {
    document.getElementById('loginPanel').classList.add('hidden');
    document.getElementById('ticketPanel').classList.remove('hidden');
    document.getElementById('btnLogout').classList.remove('hidden');
}

async function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    });

    if (res.ok) {
        const data = await res.json();
        jwtToken = data.token;
        localStorage.setItem('token', jwtToken);
        document.getElementById('loginPanel').classList.add('hidden');
        document.getElementById('ticketPanel').classList.remove('hidden');
        document.getElementById('btnLogout').classList.remove('hidden');
    } else {
        alert('Credenciales incorrectas');
    }
}

function logout() {
    jwtToken = '';
    localStorage.removeItem('token');
    document.getElementById('ticketPanel').classList.add('hidden');
    document.getElementById('btnLogout').classList.add('hidden');
    document.getElementById('loginPanel').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

async function crearTicket() {
    const ticket = {
        nombreSolicitante: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        impacto: document.getElementById('impacto').value,
        urgencia: document.getElementById('urgencia').value,
        tiempoEstimado: parseInt(document.getElementById('tiempo').value) || 0
    };

    const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify(ticket)
    });

    if (res.ok) {
        alert(`¡Ticket guardado exitosamente!`);
        document.getElementById('nombre').value = '';
        document.getElementById('descripcion').value = '';
    } else {
        alert('Error al crear ticket. Complete todos los campos.');
    }
}

function abrirVentanaTickets() {
    document.getElementById('ventanaTickets').classList.remove('hidden');
    cargarTickets();
}

function cerrarVentanaTickets() {
    document.getElementById('ventanaTickets').classList.add('hidden');
}

async function cargarTickets() {
    const res = await fetch('/api/tickets', {
        headers: { 'Authorization': 'Bearer ' + jwtToken }
    });

    if (res.ok) {
        const tickets = await res.json();
        let html = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Solicitante</th>
                    <th>Categoría</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>`;
        
        tickets.forEach(t => {
            html += `
                <tr>
                    <td>${t.id}</td>
                    <td>${t.nombreSolicitante}</td>
                    <td>${t.categoria}</td>
                    <td style="color: #00f2fe; font-weight: bold;">${t.prioridad}</td>
                    <td>${t.estado}</td>
                    <td class="action-btns">
                        <button class="btn-modificar" onclick="modificarTicket(${t.id})">✎ Modificar</button>
                        <button class="btn-eliminar" onclick="eliminarTicket(${t.id})">✖ Eliminar</button>
                    </td>
                </tr>`;
        });
        html += '</table>';
        document.getElementById('listaTickets').innerHTML = html;
    }
}

async function eliminarTicket(id) {
    if(confirm('¿Estás seguro de eliminar este ticket?')) {
        const res = await fetch(`/api/tickets/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + jwtToken }
        });
        if(res.ok) cargarTickets();
    }
}

async function modificarTicket(id) {
    const nuevoEstado = prompt("Ingrese nuevo estado (pendiente, en proceso, resuelto):");
    if(nuevoEstado) {
        const res = await fetch(`/api/tickets/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken 
            },
            body: JSON.stringify({ estado: nuevoEstado })
        });
        if(res.ok) cargarTickets();
    }
}