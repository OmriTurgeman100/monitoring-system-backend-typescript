import { RequestHandler } from "express";
import pool from "../database/db";

export const get_distinct_reports: RequestHandler = async (req, res, next) => {
  try {
    const list_of_distinct_reports = await pool.query(
      "select distinct on (title) title, time, value from reports order by title, time desc"
    );

    res.status(200).json(list_of_distinct_reports.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const post_reports: RequestHandler = async (req, res, next) => {
  try {
    const {report_id, parent, title, description, value} = req.body;

    
  } catch (error) {
    res.status(400).json(error);
  }
};
