import express from "express";
import * as ruleController from "../controllers/ruleController";

const router = express.Router();

router
.route("/")
.post(ruleController.post_rules);

router
  .route("/:id")
  .get(ruleController.get_rule)

export default router;
