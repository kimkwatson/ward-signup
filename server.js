require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const { connectToDb } = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routes
router.get("/sheets", async (req, res) => {
    res.send("All sheets");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectToDb(process.env.MONGODB_URI, process.env.DB_NAME).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

