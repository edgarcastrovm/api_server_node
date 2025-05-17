-- Función para obtener todos los productos
CREATE OR REPLACE FUNCTION get_all_products()
RETURNS TABLE (
    id INTEGER,
    nombre VARCHAR,
    precio DECIMAL,
    stock INTEGER,
    fecha_creacion TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY SELECT p.id, p.nombre, p.precio, p.stock, p.fecha_creacion FROM productos p;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener un producto por ID
CREATE OR REPLACE FUNCTION get_product_by_id(p_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    nombre VARCHAR,
    precio DECIMAL,
    stock INTEGER,
    fecha_creacion TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY SELECT p.id, p.nombre, p.precio, p.stock, p.fecha_creacion FROM productos p WHERE p.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Función para crear un nuevo producto
CREATE OR REPLACE FUNCTION create_product(p_nombre VARCHAR, p_precio DECIMAL, p_stock INTEGER)
RETURNS TABLE (
    id INTEGER,
    nombre VARCHAR,
    precio DECIMAL,
    stock INTEGER,
    fecha_creacion TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    new_product_id INTEGER;
BEGIN
    INSERT INTO productos (nombre, precio, stock) VALUES (p_nombre, p_precio, p_stock) RETURNING id INTO new_product_id;
    RETURN QUERY SELECT p.id, p.nombre, p.precio, p.stock, p.fecha_creacion FROM productos p WHERE p.id = new_product_id;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar un producto
CREATE OR REPLACE FUNCTION update_product(p_id INTEGER, p_nombre VARCHAR, p_precio DECIMAL, p_stock INTEGER)
RETURNS TABLE (
    id INTEGER,
    nombre VARCHAR,
    precio DECIMAL,
    stock INTEGER,
    fecha_creacion TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    UPDATE productos SET nombre = p_nombre, precio = p_precio, stock = p_stock WHERE id = p_id;
    RETURN QUERY SELECT p.id, p.nombre, p.precio, p.stock, p.fecha_creacion FROM productos p WHERE p.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Función para eliminar un producto
CREATE OR REPLACE FUNCTION delete_product(p_id INTEGER)
RETURNS TABLE (
    deleted_count INTEGER
) AS $$
DECLARE
    rows_deleted INTEGER;
BEGIN
    DELETE FROM productos WHERE id = p_id;
    GET DIAGNOSTICS rows_deleted = ROW_COUNT;
    RETURN QUERY SELECT rows_deleted;
END;
$$ LANGUAGE plpgsql;