const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const studentRoutes = require("./routes/studentRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://careerconnect.vercel.app"
    ],
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);

// Serve resumes
app.use("/uploads", express.static("uploads"));

// Root test
app.get("/", (req, res) => {
    res.send("CareerConnect API running");
});

// Database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});