const { MongoClient } = require("mongodb");

let db;

async function connectToDb(uri, dbName) {
  if (db) return db; 
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDb first.");
  }
  return db;
}

module.exports = { connectToDb, getDb };
