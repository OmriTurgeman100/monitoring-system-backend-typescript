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

  for (const rule of rules_data) {
    const rule_id: number = rule.rule_id;
    const parent_node_id: number = rule.parent_node_id;
    const action: string = rule.action;

    let case_matched: boolean = false;

    if (rule.conditions.or) {
      for (const condition of rule.conditions.or) {
        // TODO, might check if we refer to a report or a node.

        if (condition.node_id) {
          const node = nodes_data.find((node) => {
            return node.node_id === condition.node_id;
          });

          if (node && node.status === condition.status) {
            case_matched = true;
            break;
          }
        }

        if (condition.report_id) {
          const report = reports_data.find((report) => {
            return report.report_id === condition.report_id;
          });

          const report_value: number = report.value;
          const condition_operator: string = condition.operator;

          const condition_threshold: number = condition.value;

          switch (condition_operator) {
            case "<":
              if (report_value < condition_threshold) {
                case_matched = true;
              }
              break;
            case ">":
              if (report_value > condition_threshold) {
                case_matched = true;
              }
              break;
            case "==":
              if (report_value == condition_threshold) {
                case_matched = true;
              }
              break;
            default:
              null;
          }
        }
      }
    }

    if (rule.conditions.and && case_matched === false) {
      let nodes_conditions_met: boolean = true;
      let reports_condition_met: boolean = false;

      for (const condition of rule.conditions.and) {
        if (condition.node_id) {
          const node = nodes_data.find((node) => {
            return node.node_id === condition.node_id;
          });

          if (!node) {
            continue;
          }

          if (node.status !== condition.status) {
            nodes_conditions_met = false;
            break;
          }
        }

        if (condition.report_id) {
          const report = reports_data.find(
            (report) => report.report_id === condition.report_id
          );

          if (!report) {
            continue;
          }

          const report_value: number = report.value;
          const condition_operator: string = condition.operator;
          const condition_threshold: number = condition.value;

          switch (condition_operator) {
            case "<":
              if (report_value < condition_threshold) {
                reports_condition_met = true;
              }
              break;
            case ">":
              if (report_value > condition_threshold) {
                reports_condition_met = true;
              }
              break;
            case "==":
              if (report_value == condition_threshold) {
                reports_condition_met = true;
              }
              break;
            default:
              break;
          }

          if (!reports_condition_met) {
            break;
          }
        }
      }
    }
  }
};

export default tree_rules_eval;
