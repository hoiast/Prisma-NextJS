import { Router } from "express";
import PersonController from "../controllers/personController";

const router = Router();

router
  .get("/", PersonController.index)
  .post("/", PersonController.create)
  .get("/:id", PersonController.show)
  .put("/:id", PersonController.update)
  .delete("/:id", PersonController.delete)
  .get("/:id/events", PersonController.findEventsByPersonId)
  .patch("/:id/events/:eventId", PersonController.connectEventPersonByIds)
  .delete("/:id/events/:eventId", PersonController.disconnectEventPersonByIds);

export default router;
