import express from "express";
import * as ruleController from "../controllers/ruleController";

const router = express.Router();

router
  .route("/:id")
  .get(ruleController.get_rule)
  .post(ruleController.post_rules);

export default router;
