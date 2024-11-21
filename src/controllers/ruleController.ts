import { RequestHandler } from "express";
import pool from "../database/db";

export const get_rule: RequestHandler = async (req, res, next) => {
  try {
    const rules = await pool.query(
      "select * from rules where parent_node_id = $1",
      [req.params.id]
    );

    res.status(200).json(rules.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const post_rules: RequestHandler = async (req, res, next) => {
  try {
    const { parent_node_id, conditions, action } = req.body;

    console.log(
      `parent_node_id ${parent_node_id}, condition ${conditions}, action ${action}`
    );

    res.status(201).json({ message: "The POST request was successful" });
  } catch (error) {
    res.status(400).json(error);
  }
};
