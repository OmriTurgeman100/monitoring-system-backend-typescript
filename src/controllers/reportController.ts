import { RequestHandler } from "express";
import pool from "../database/db";
import tree_rules_eval from "../utils/tree_rules";
import { Request, Response, NextFunction } from "express";

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
    const { report_id, parent, title, description, value } = req.body;

    if (!parent) {
      const reports = await pool.query(
        "select distinct on (parent) parent, report_id, title, excluded from reports where report_id = $1",
        [report_id]
      );

      for (const report of reports.rows) {
        if (report.parent) {
          const report_parent: number = report.parent;
          const excluded: string = report.excluded;

          await pool.query(
            "insert into reports (report_id, parent, title, description, value, excluded) values ($1, $2, $3, $4, $5, $6) RETURNING *;",
            [report_id, report_parent, title, description, value, excluded]
          );

          // await tree_rules_eval(report_parent); // * causes bugs, on comment for now.
        }
      }
    }

    if (parent) {
      const distinct_reports = await pool.query(
        "select distinct on (parent) parent, report_id, title, excluded from reports where report_id = $1 and parent is not null",
        [report_id]
      );

      if (distinct_reports.rows.length > 0) {
        for (const report of distinct_reports.rows) {
          const report_parent: number = report.parent;

          console.log(report_parent);

          if (report_parent != parent) {
            res.status(400).json({
              message: "report can only be under 1 parent.",
            });
            return; 
          }
        }
      }
    }

    await pool.query(
      "insert into reports (report_id, parent, title, description, value) values ($1, $2, $3, $4, $5) RETURNING *;",
      [report_id, parent, title, description, value]
    );

    res.status(201).json({ message: "The POST request was successful" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

