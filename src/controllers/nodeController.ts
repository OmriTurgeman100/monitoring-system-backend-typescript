import { RequestHandler } from "express";
import pool from "../database/db";

export const root_nodes: RequestHandler = async (req, res, next) => {
  try {
    const results = await pool.query(
      "select * from nodes where parent is null; "
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const navigate_tree_data: RequestHandler = async (req, res, next) => {
  try {
    const tree_data_nodes = await pool.query(
      "select * from nodes WHERE parent = $1",
      [req.params.id]
    );

    const tree_data_reports = await pool.query(
      "SELECT DISTINCT ON (report_id) id, report_id, parent, title, description, value, time FROM reports WHERE parent = $1 ORDER BY report_id, time DESC",
      [req.params.id]
    );

    res.status(200).json({
      nodes: tree_data_nodes.rows,
      reports: tree_data_reports.rows,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
