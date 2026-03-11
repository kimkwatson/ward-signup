require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const { connectToDb } = require("./db/connect");
const swaggerSpec = require("./config/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routes


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectToDb(process.env.MONGODB_URI, process.env.DB_NAME).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

