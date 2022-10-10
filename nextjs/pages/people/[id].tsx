import type { GetServerSideProps, NextPage } from "next";
import { personService, eventService } from "services";
import type { Person, Event } from "types";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import ensure from "helpers/ensure";
import SectionTitle from "components/SectionTitle";
import LinkedRoundedButton from "components/LinkedRoundedButton";
import RoundedButton from "components/RoundedButton";

interface Props {
  person: Person;
  bookedEvents: Event[];
  allEvents: Event[];
}

const Show: NextPage<Props> = ({ person, bookedEvents, allEvents }) => {
  const personData = [
    { label: "ID", data: person.id },
    { label: "Name", data: person.name },
    { label: "Criado em", data: new Date(person.created_at).toLocaleString() },
    {
      label: "Atualizado em",
      data: new Date(person.updated_at).toLocaleString(),
    },
  ];

  const [localBookedEvents, setLocalBookedEvents] =
    useState<Event[]>(bookedEvents);
  const [localUnbookedEvents, setLocalUnbookedEvents] = useState<Event[]>(
    allEvents.filter(
      (singleEvent) => !bookedEvents.find((e) => singleEvent.id == e.id)
    )
  );

  const bookEvent = async (eventId: number) => {
    await personService.joinEvent(person.id, eventId);
    setLocalBookedEvents([
      ...localBookedEvents,
      ensure(allEvents.find((singleEvent) => singleEvent.id == eventId)),
    ]);
    setLocalUnbookedEvents(
      localUnbookedEvents.filter((event) => event.id != eventId)
    );
  };

  const unbookEvent = async (eventId: number) => {
    await personService.leaveEvent(person.id, eventId);
    setLocalUnbookedEvents([
      ...localUnbookedEvents,
      ensure(allEvents.find((event) => event.id == eventId)),
    ]);
    setLocalBookedEvents(
      localBookedEvents.filter((event) => event.id != eventId)
    );
  };

  return (
    <div className="container">
      <div>
        <Head>
          <title>Crud - Prisma</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png"></link>
        </Head>
        <LinkedRoundedButton href={`/`} icon="arrow_back" />
        <SectionTitle
          title="Informações"
          icon="edit"
          href={`/people/edit/${person.id}`}
        />
        <table>
          <tbody>
            {personData.map((line) => (
              <tr key={line.label}>
                <td>
                  <p>{line.label}</p>
                </td>
                <td>
                  <p>{line.data}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="my-4 text-2xl font-bold text-green-700">
          Eventos Agendados
        </h2>

        <table className="mt-4">
          <tbody>
            {localBookedEvents.map((event) => (
              <tr key={event.id} className="even:bg-gray-100">
                <td>
                  <p>{event.title}</p>
                </td>
                <td>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </td>
                <td>
                  <p>{new Date(event.date).toLocaleTimeString()}</p>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-4">
                    <LinkedRoundedButton
                      href={`/events/${event.id}`}
                      icon="visibility"
                    />
                    <RoundedButton
                      icon="event_busy"
                      onClick={() => unbookEvent(event.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="my-4 text-2xl font-bold text-red-700">
          Eventos Não Agendados
        </h2>

        <table className="mt-4">
          <tbody>
            {localUnbookedEvents.map((event) => (
              <tr key={event.id} className="even:bg-gray-100">
                <td>
                  <p>{event.title}</p>
                </td>
                <td>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </td>
                <td>
                  <p>{new Date(event.date).toLocaleTimeString()}</p>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-4">
                    <LinkedRoundedButton
                      href={`/events/${event.id}`}
                      icon="visibility"
                    />
                    <RoundedButton
                      icon="event_available"
                      onClick={() => bookEvent(event.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Show;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const person =
    params?.id && typeof params?.id === "string"
      ? await personService.getById(parseInt(params?.id))
      : null;
  const bookedEvents =
    params?.id && typeof params?.id === "string"
      ? await personService.getEvents(parseInt(params?.id))
      : null;
  const allEvents = await eventService.getAll();
  return {
    props: { person, bookedEvents, allEvents },
  };
};
