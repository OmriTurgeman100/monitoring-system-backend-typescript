import express from 'express'
import * as reportController from "../controllers/reportController"

const router = express.Router()

router
  .route("/")
  // .post

router
  .route("/distinct")
  .get(reportController.get_distinct_reports);

export default router;