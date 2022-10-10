import client from "../src/database/";

const peopleNames = ["João", "Pedro", "Alice", "Bruna"];
const eventsData = [
  {
    title: "Festa de aniversário",
    date: "2022-08-01T14:00:00.000Z",
  },
  {
    title: "Festa de casamento",
    date: "2022-08-02T14:00:00.000Z",
  },
  {
    title: "Festa de formatura",
    date: "2022-08-03T14:00:00.000Z",
  },
  {
    title: "Festa de 15 anos",
    date: "2022-08-04T14:00:00.000Z",
  },
];
const peopleInEvents = [[1], [1, 3], [1, 2, 4], [2, 3, 4]];

async function main() {
  const users = await client.person.createMany({
    data: peopleNames.map((name) => ({ name })),
  });

  const events = await client.event.createMany({
    data: eventsData.map((event) => ({
      title: event.title,
      date: event.date,
    })),
  });

  peopleInEvents.forEach(
    async (eventIds, index) =>
      await client.person.update({
        where: {
          id: index + 1,
        },
        data: {
          events: {
            connect: eventIds.map((id) => ({ id })),
          },
        },
      })
  );
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
