import client from "../database";
import { Prisma } from "@prisma/client";

export default class EventService {
  async findMany(query: Prisma.EventFindManyArgs | undefined = undefined) {
    return await client.event.findMany(query);
  }

  async findUnique(id: number) {
    return await client.event.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return await client.event.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return await client.event.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return await client.event.delete({
      where: {
        id,
      },
    });
  }
}
