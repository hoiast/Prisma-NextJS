import type { Request, Response } from "express";
import client from "../database";

class EventController {
  static async index(req: Request, res: Response) {
    try {
      const events = await client.event.findMany();
      res.json(events);
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async show(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const event = await client.event.findUnique({
        where: {
          id,
        },
      });
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ error: { message: "Event not found" } });
      }
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const event = await client.event.create({
        data: req.body,
      });
      res.status(201).json(event);
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const event = await client.event.update({
        where: {
          id,
        },
        data: req.body,
      });
      res.json(event);
    } catch (err: any) {
      if (err?.code === "P2025") {
        res.status(404).json({ error: { message: "Event not found" } });
      } else {
        res.status(500).json({ error: err });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const event = await client.event.delete({
        where: {
          id,
        },
      });
      res.json(event);
    } catch (err: any) {
      if (err?.code === "P2025") {
        res.status(404).json({ error: { message: "Event not found" } });
      } else {
        res.status(500).json({ error: err });
      }
    }
  }

  static async findPeopleByEventId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const event = await client.event.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { people: true },
      });
      if (event) {
        res.json(event.people);
      } else {
        res.status(404).json({ error: { message: "Event not found" } });
      }
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }
}

export default EventController;
