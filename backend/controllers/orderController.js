const pool = require("../config/db");

// CREATE ORDER
const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Le panier est vide",
      });
    }

    await client.query("BEGIN");

    let totalPrice = 0;

    const productsData = [];

    for (const item of items) {
      const productResult = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [item.product_id]
      );

      if (productResult.rows.length === 0) {
        throw new Error(
          `Produit ${item.product_id} introuvable`
        );
      }

      const product = productResult.rows[0];

      if (product.stock < item.quantity) {
        throw new Error(
          `Stock insuffisant pour ${product.name}`
        );
      }

      const itemTotal =
        Number(product.price) * item.quantity;

      totalPrice += itemTotal;

      productsData.push({
        product,
        quantity: item.quantity,
      });
    }

    const orderResult = await client.query(
      `INSERT INTO orders
       (user_id, total_price, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, totalPrice, "pending"]
    );

    const order = orderResult.rows[0];

    for (const item of productsData) {
      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [
          order.id,
          item.product.id,
          item.quantity,
          item.product.price,
        ]
      );

      await client.query(
        `UPDATE products
         SET stock = stock - $1
         WHERE id = $2`,
        [
          item.quantity,
          item.product.id,
        ]
      );
    }

    await client.query("COMMIT");

    return res.status(201).json({
      message: "Commande créée avec succès",
      order,
    });

  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Erreur createOrder :", error);

    return res.status(500).json({
      message: error.message || "Erreur serveur",
    });

  } finally {
    client.release();
  }
};

// GET USER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT *
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.status(200).json(result.rows);

  } catch (error) {
    console.error("Erreur getMyOrders :", error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};