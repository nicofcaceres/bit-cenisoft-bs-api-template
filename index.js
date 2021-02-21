const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { PORT } = require('./config')

// Carga y abre la conexión con la base de datos
require('./db')

// Rutas
const bookRoutes = require('./components/book/routes');
const clientRoutes = require('./components/client/routes');
const saleRoutes = require('./components/sale/routes');

// Middleware para permitir recibir solicitudes HTTP desde cualquier dominio
app.use(cors());

// Middleware para leer datos en JSON desde el body de la petición
app.use(bodyParser.json());

// Instalación de rutas en el router principal
app.use('/books', bookRoutes);
app.use('/clients', clientRoutes);
app.use('/clients', saleRoutes);

app.use('/covers', express.static('covers'));

app.listen(PORT, () => {
  console.log(`Server APP listening at localhost:${PORT}`)
})
