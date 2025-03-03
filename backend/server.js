require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const adsRoutes = require("./routes/beneficiaryRoutes");
const BFYRoutes = require("./routes/BFYRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contactRoutes"); // Import the contact routes
// const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require("./routes/homeRoutes");
const topDonors = require("./routes/topDonorRoutes");
const chatRoutes = require("./routes/chatRoutes");
const donationRoutes = require("./routes/donationRoutes");

require("./models/associations");
const cors = require("cors"); //new

const app = express();
const PORT = process.env.PORT || 5000;

// ------------ Middlewares ------------
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow sending cookies
  })
); //new
app.use("/api/users", userRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/ads", adsRoutes);
// app.use('/api/admin', adminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes); // Add the contact route
app.use("/api/BFY", BFYRoutes);
app.use("/api", donationRoutes);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/top", topDonors);
app.use("/api/boot", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hello! Your Express server and Sequelize connection are working.");
});

// ------------ Start Server & Database ------------
const startServer = async () => {
  try {
    // Test DB
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Sync DB
    await sequelize.sync({ force: false });
    console.log("Database synced");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

startServer();
