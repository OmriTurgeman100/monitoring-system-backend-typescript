import { RequestHandler } from "express";
import pool from "../database/db";

export const set_excluded_report: RequestHandler = async (req, res, next) => {
  try {
    const report_id: string = req.body.report_id;
    const parent: number = req.body.parent;

    const excluded = pool.query(
      "update reports set excluded = 'true' where report_id = $1 and parent = $2",
      [report_id, parent]
    );

    res.status(201).json({ message: "The POST request was successful" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const delete_excluded_report: RequestHandler = async (req, res, next) => {
  try {
    const report_id: string = req.body.report_id;
    const parent: number = req.body.parent;

    const excluded = pool.query(
      "update reports set excluded = 'true' where report_id = $1 and parent = $2",
      [report_id, parent]
    );

    res.status(201).json({ message: "The POST request was successful" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};