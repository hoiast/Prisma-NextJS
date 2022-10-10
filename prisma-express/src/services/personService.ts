import client from "../database";
import { Prisma } from "@prisma/client";

export default class PersonService {
  async findMany(query: Prisma.PersonFindManyArgs | undefined = undefined) {
    return await client.person.findMany(query);
  }

  async findUnique(
    id: number,
    include: Prisma.PersonInclude | undefined = undefined
  ) {
    return await client.person.findUnique({
      where: {
        id,
      },
      include,
    });
  }

  async create(data: any) {
    return await client.person.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return await client.person.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return await client.person.delete({
      where: {
        id,
      },
    });
  }
}
