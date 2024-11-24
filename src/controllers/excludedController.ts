import { RequestHandler } from "express";
import pool from "../database/db";

export const set_excluded_report: RequestHandler = async (req, res, next) => {
  try {
    const parent: number = req.body.parent;
    const report_id: string = req.body.report_id;

    const excluded = pool.query(
      "update reports set excluded = 'false' where report_id = $1 and parent = $2",
      []
    );
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
