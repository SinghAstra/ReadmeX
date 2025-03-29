import { Request, Response } from "express";
import redisClient from "../config/redis";

export const setValue = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.query;

    if (!key || !value) {
      res.status(400).json({
        message: "Both key and value are required in query parameters",
      });
      return;
    }

    await redisClient.set(key as string, value as string);

    res.status(200).json({
      message: "Value set successfully",
      key,
      value,
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    res.status(500).json({
      message: "Failed to set value in Redis",
    });
  }
};

export const getValue = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;

    if (!key) {
      res.status(400).json({
        message: "Key is required in query parameters",
      });
      return;
    }

    const value = await redisClient.get(key as string);

    if (value === null) {
      res.status(404).json({
        message: "No value found for the given key",
      });
      return;
    }

    res.status(200).json({
      key,
      value,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    res.status(500).json({
      message: "Failed to retrieve value from Redis",
    });
  }
};

export const incrementCounter = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;

    if (!key) {
      res.status(400).json({
        message: "Key is required in query parameters",
      });
      return;
    }

    const newValue = await redisClient.incr(key as string);

    res.status(200).json({
      key,
      value: newValue,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    res.status(500).json({
      message: "Failed to increment counter",
    });
  }
};
