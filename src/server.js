const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const contactMessageRoutes = require("./routes/contactMessageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const projectRoutes = require("./routes/projectRoutes");
const sequelize = require("./config/db");
const reviewRoutes = require('./routes/ReviewRoutes');
const unapprovedReviewRoutes = require('./routes/unapproved');
const servicesRoutes = require("./routes/serviceRoutes");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use("/api", contactMessageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", reviewRoutes);
app.use("/api/unapproved-reviews", unapprovedReviewRoutes);
app.use("/api/services", servicesRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5656;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully.");

        await sequelize.sync({ alter: true });
        console.log("Database synchronized");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Upload path: ${path.join(__dirname, '../uploads')}`);
        });
    } catch (error) {
        console.error("Server startup failed:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        
        if (error.name === 'SequelizeConnectionError') {
            console.error("Database connection details:", {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                database: process.env.DB_NAME,
                user: process.env.DB_USER
            });
        }
        
        process.exit(1);
    }
};

startServer();