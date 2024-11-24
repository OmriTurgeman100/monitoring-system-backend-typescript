import express from "express";
import * as excludedController from "../controllers/excludedController";

const router = express.Router();

router
  .route("/")
  .post(excludedController.set_excluded_report)
  .delete(excludedController.delete_excluded_report);

export default router;
