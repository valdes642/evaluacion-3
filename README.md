## Instalación

1. Asegúrate de tener instalado [Node.js](https://nodejs.org/) y MySQL en tu equipo.
2. Clona o descarga este repositorio.
3. Abre una terminal dentro de la carpeta principal del proyecto (donde está el archivo `package.json`).
4. Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

\`\`\`bash
npm install
\`\`\`

> **Nota:** Esto leerá el archivo `package.json` y descargará automáticamente Express, MySQL2, CORS y JSONWebToken creando la carpeta `node_modules`.

##Ejecución del Servidor

Una vez finalizada la instalación y con tu servidor MySQL encendido (XAMPP o Workbench), levanta el servidor ejecutando:

\`\`\`bash
npm start
\`\`\`

Verás un mensaje indicando que el servidor está corriendo. Luego, simplemente abre tu navegador e ingresa a:
👉 `http://localhost:3000`