import pool from "../database/db";

const tree_rules_eval = async (report_parent: number) => {
  // TODO make it run as a tree, until it reaches the root node.
  const nodes = await pool.query("select * from nodes where parent = $1", [
    report_parent,
  ]);

  const reports = await pool.query(
    "SELECT DISTINCT ON (report_id) id, report_id, parent, title, description, value, time FROM reports WHERE parent = $1 ORDER BY report_id, time DESC",
    [report_parent]
  );

  const rules = await pool.query(
    "select * from rules where parent_node_id = $1",
    [report_parent]
  );

  const nodes_data = nodes.rows;

  const reports_data = reports.rows;

  const rules_data = rules.rows;

  console.log(`rules_data: ${rules_data}`);

  for (const rule of rules_data) {
    const rule_id: number = rule.rule_id;
    const parent_node_id: number = rule.parent_node_id;
    
    if (rule.conditions.or) {
      for (const condition of rule.conditions.or) {
        console.log(condition);
      }
    }
  }
};

export default tree_rules_eval;
