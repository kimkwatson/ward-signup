const { getDb } = require("../db/connect");

const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers };