import { Router } from "express";
import EventController from "../controllers/eventController";

const router = Router();

router
  .get("/", EventController.index)
  .post("/", EventController.create)
  .get("/:id", EventController.show)
  .put("/:id", EventController.update)
  .delete("/:id", EventController.delete)
  .get("/:id/people", EventController.findPeopleByEventId);

export default router;
