const bodyParser = require("body-parser");
import people from "./personRoutes";
import events from "./eventRoutes";
import test from "./testRoutes";
import type { Express } from "express";

export default (app: Express) => {
  app.use(bodyParser.json());
  app.use("/people", people);
  app.use("/events", events);
  app.use("/test", test);
};
