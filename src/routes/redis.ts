import { Router } from "express";
import { getValue, incrementCounter, setValue } from "../controllers/redis";

const router = Router();

// Route to set a value in Redis via query parameters
router.get("/set", setValue);

// Route to get a value from Redis via query parameters
router.get("/get", getValue);

// Route to increment a counter
router.get("/increment", incrementCounter);

export default router;
