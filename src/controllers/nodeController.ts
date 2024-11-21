import { RequestHandler } from "express";
import pool from "../database/db";

export const getNodes: RequestHandler = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM nodes;");
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ success: false, error: "Database error" });
  }
};
