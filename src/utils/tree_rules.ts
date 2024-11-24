import pool from "../database/db";

const tree_rules_eval = async (report_parent: number) => {
  let parent: number = report_parent; // * might use it in the future to examine rules and climb to the root.

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
  // TODO make it override the parent above.
  const nodes_data = nodes.rows;

  const reports_data = reports.rows;

  const rules_data = rules.rows;

  // console.log(`nodes_data`);
  for (const node of nodes_data) {
    console.log(node);
  }

  // console.log(`reports_data`);
  for (const report of reports_data) {
    console.log(report);
  }

  for (const rule of rules_data) {
    const rule_id: number = rule.rule_id;
    const parent_node_id: number = rule.parent_node_id;
    const action: string = rule.action;

    let case_matched: boolean = false;

    if (rule.conditions.or) {
      // TODO, might check if we refer to a report or a node.
      for (const condition of rule.conditions.or) {
        console.log("or");
        console.log(condition);

        if (condition.node_id) {
          console.log("node_ind");
        }

        if (condition.report_id) {
          console.log("report");
        }
      }
    }

    if (rule.conditions.and) {
      // TODO, might check if we refer to a report or a node.
      for (const condition of rule.conditions.and) {
        console.log("and");
        console.log(condition);

        if (condition.node_id) {
          console.log("node_ind");
        }

        if (condition.report_id) {
          console.log("report");
        }
      }
    }

    console.log(`case matched is ${case_matched}`);
  }
};

export default tree_rules_eval;
