import pool from "../database/db";

const tree_rules_eval = async (report_parent: number) => {
  //   console.log(`report_id: ${report_id}, report_parent: ${report_parent}`);

  const nodes_and_reports = await pool.query(
    "select * from nodes where parent = $1",
    [report_parent]
  );

  const rules = await pool.query(
    "select * from rules where parent_node_id = $1",
    [report_parent]
  );

  console.log(nodes_and_reports.rows);

  console.log(rules.rows);
};

export default tree_rules_eval;
