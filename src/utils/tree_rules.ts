import pool from "../database/db";

const tree_rules_eval = async (report_parent: number) => {
  //   console.log(`report_id: ${report_id}, report_parent: ${report_parent}`);

  const nodes = await pool.query(
    "select * from nodes where parent = $1",
    [report_parent]
  );

  const rules = await pool.query(
    "select * from rules where parent_node_id = $1",
    [report_parent]
  );

  const nodes_data = nodes.rows

  const rules_data = rules.rows

  console.log(nodes_data)

  console.log(rules_data)
  

  
};

export default tree_rules_eval;
