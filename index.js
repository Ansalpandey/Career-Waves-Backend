const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./db/db");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const dotenv = require("dotenv");
dotenv.config();
const { rateLimit } = require("express-rate-limit");

// Enable CORS
app.use(
  cors({
    origin: "https://careerwaveseducation.in", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

app.use(limiter);

// Middleware
app.use(morgan("dev"));

const startServer = async () => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Connect to MongoDB
  await connectDB();

  // Import routes
  const userRoutes = require("./routes/user.routes");
  app.use("/api/v1/users", userRoutes);

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start the server and handle potential connection errors
startServer().catch((error) => console.log("Failed to start server:", error));
