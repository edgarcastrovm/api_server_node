const db = require('../config/db.config');

// Función para ejecutar una consulta
const executeQuery = async (query, params) => {
  const client = await db.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM get_all_products()');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await executeQuery('SELECT * FROM get_product_by_id($1)', [id]);
    if (product.length > 0) {
      res.status(200).json(product[0]);
    } else {
      res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
    }
  } catch (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error);
    res.status(500).json({ message: `Error al obtener producto con ID ${id}` });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { nombre, precio, stock } = req.body;
  try {
    const newProduct = await executeQuery('SELECT * FROM create_product($1, $2, $3)', [nombre, precio, stock]);
    res.status(201).json(newProduct[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  try {
    const updatedProduct = await executeQuery('SELECT * FROM update_product($1, $2, $3, $4)', [id, nombre, precio, stock]);
    if (updatedProduct.length > 0) {
      res.status(200).json(updatedProduct[0]);
    } else {
      res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
    }
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error);
    res.status(500).json({ message: `Error al actualizar producto con ID ${id}` });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await executeQuery('SELECT * FROM delete_product($1)', [id]);
    if (result[0]?.deleted_count > 0) {
      res.status(200).json({ message: `Producto con ID ${id} eliminado correctamente` });
    } else {
      res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
    }
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id}:`, error);
    res.status(500).json({ message: `Error al eliminar producto con ID ${id}` });
  }
};