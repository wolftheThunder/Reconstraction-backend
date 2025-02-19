const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const contactMessageRoutes = require("./routes/contactMessageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sequelize = require("./config/db");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  
  methods: "GET,POST,PUT,DELETE",  
  allowedHeaders: ["Content-Type", "Authorization"],  
}));

app.use(bodyParser.json());

app.use("/api", contactMessageRoutes);
app.use("/api/admin", adminRoutes); //

const PORT = process.env.PORT || 5656;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
