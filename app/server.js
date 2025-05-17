const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const pageRoutes = require('./routes/page.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/', pageRoutes);
// Rutas
app.use('/api/productos', productRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡API de productos funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});