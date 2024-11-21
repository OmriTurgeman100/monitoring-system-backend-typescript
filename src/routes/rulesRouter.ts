import express from 'express'
import * as ruleController from "../controllers/ruleController";

const router = express.Router()

router
  .route("/:id")
  .get(ruleController.get_specific_rule)

export default router;