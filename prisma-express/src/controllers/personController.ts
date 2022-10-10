import type { Request, Response } from "express";
import client from "../database";

class PersonController {
  static async index(req: Request, res: Response) {
    try {
      const people = await client.person.findMany();
      res.json(people);
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async show(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const person = await client.person.findUnique({
        where: {
          id,
        },
      });
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: { message: "Person not found" } });
      }
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const person = await client.person.create({
        data: req.body,
      });
      res.status(201).json(person);
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const person = await client.person.update({
        where: {
          id,
        },
        data: req.body,
      });
      res.json(person);
    } catch (err: any) {
      if (err?.code === "P2025") {
        res.status(404).json({ error: { message: "Person not found" } });
      } else {
        res.status(500).json({ error: err });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const person = await client.person.delete({
        where: {
          id,
        },
      });
      // res.json(person);
      res.status(204).send();
    } catch (err: any) {
      if (err?.code === "P2025") {
        res.status(404).json({ error: { message: "Person not found" } });
      } else {
        res.status(500).json({ error: err });
      }
    }
  }

  static async findEventsByPersonId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const person = await client.person.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { events: true },
      });
      if (person) {
        res.json(person.events);
      } else {
        res.status(404).json({ error: { message: "Person not found" } });
      }
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async connectEventPersonByIds(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const eventId = parseInt(req.params.eventId);
    try {
      const person = await client.person.update({
        where: { id },
        data: {
          events: {
            connect: { id: eventId },
          },
        },
      });
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async disconnectEventPersonByIds(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const eventId = parseInt(req.params.eventId);
    try {
      const person = await client.person.update({
        where: { id },
        data: {
          events: {
            disconnect: { id: eventId },
          },
        },
      });
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }
}

export default PersonController;
