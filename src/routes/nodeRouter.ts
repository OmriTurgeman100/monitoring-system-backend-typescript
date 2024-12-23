import express from 'express'
import * as nodeController from '../controllers/nodeController';

const router = express.Router();

router
  .route("/")
  .post(nodeController.post_node)
  .get(nodeController.root_nodes);

router
  .route("/:id")
  .get(nodeController.navigate_tree_data);

export default router;