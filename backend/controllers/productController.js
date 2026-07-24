const pool = require("../config/db");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, stock } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Le nom et le prix sont obligatoires",
      });
    }

    const newProduct = await pool.query(
      `INSERT INTO products (name, description, price, image_url, stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name,
        description || null,
        price,
        image_url || null,
        stock || 0,
      ]
    );

    return res.status(201).json({
      message: "Produit ajouté avec succès",
      product: newProduct.rows[0],
    });
  } catch (error) {
    console.error("Erreur createProduct :", error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur getProducts :", error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// GET ONE PRODUCT
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Produit introuvable",
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur getProductById :", error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url, stock } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name = $1,
           description = $2,
           price = $3,
           image_url = $4,
           stock = $5
       WHERE id = $6
       RETURNING *`,
      [
        name,
        description,
        price,
        image_url,
        stock,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Produit introuvable",
      });
    }

    return res.status(200).json({
      message: "Produit modifié avec succès",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur updateProduct :", error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Produit introuvable",
      });
    }

    return res.status(200).json({
      message: "Produit supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur deleteProduct :", error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};