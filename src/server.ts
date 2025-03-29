import express from "express";
import redisRoutes from "./routes/redis";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server is up!" });
});

// Use Redis routes
app.use("/redis", redisRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
