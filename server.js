require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const mongodb = require('./db/connect');
//const { connectToDb } = require("./db/connect");

const users = require("./routes/users");
const sheets = require("./routes/sheets");
const slots = require("./routes/slots");
const claims = require("./routes/claims");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", users);
app.use("/sheets", sheets);
app.use("/slots", slots);
app.use("/claims", claims);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// initialize mongodb
const startServer = async () => {
    try {
        await mongodb.initDb();
        console.log('MongoDB connected');

        app.listen(PORT, () => {
          console.log(`Server running on port ${{PORT}}`);
        });
    } catch (error) {
        console.error('Failed to start server: ', error);
    }
};

startServer();

/*
connectToDb(process.env.MONGODB_URI, process.env.DB_NAME).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}); */


