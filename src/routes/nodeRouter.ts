import express from 'express'
import * as nodeController from '../controllers/nodeController';

const router = express.Router();

router
  .route("/")
  .get(nodeController.getNodes);

export default router;