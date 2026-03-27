const { MongoClient } = require("mongodb");

let _db;

const initDb = async () => {
    if (_db) {
        console.log('Db is already initialized!');
        return _db;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client;
    return _db;
};

const getDb = () => {
    if (!_db) {
        throw new Error('Database not initialized');
    }
    return _db;
};

module.exports = { initDb, getDb };

/*
async function connectToDb(uri, dbName) {
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

module.exports = { connectToDb, getDb }; */
