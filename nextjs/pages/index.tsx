import { personService, eventService } from "services";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import type { Person, Event } from "types";
import LinkedRoundedButton from "components/LinkedRoundedButton";
import RoundedButton from "components/RoundedButton";
import SectionTitle from "components/SectionTitle";

interface Props {
  people: Person[];
  events: Event[];
}

const Home: NextPage<Props> = ({ people, events }) => {
  const [localPeople, setLocalPeople] = useState<Person[]>(people);
  const [localEvents, setLocalEvents] = useState<Event[]>(events);

  const confirmDeletePerson = (id: number) => {
    if (confirm(`Tem certeza que deseja excluir esta pessoa?`)) {
      deletePerson(id);
    }
  };

  const deletePerson = async (id: number) => {
    await personService
      .delete(id)
      .then(() => {
        setLocalPeople(localPeople.filter((person) => person.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const confirmDeleteEvent = (id: number) => {
    if (confirm(`Tem certeza que deseja excluir este evento?`)) {
      deleteEvent(id);
    }
  };

  const deleteEvent = async (id: number) => {
    await eventService
      .delete(id)
      .then(() => {
        setLocalEvents(localEvents.filter((event) => event.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div>
        <Head>
          <title>Crud - Prisma</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png"></link>
        </Head>

        <SectionTitle title="Pessoas" icon="add" href="/people/create" />
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {localPeople.length === 0 ? (
              <tr>
                <td className="text-center" colSpan={2}>
                  Não há pessoas registradas
                </td>
              </tr>
            ) : (
              localPeople.map((person) => (
                <tr key={person.id}>
                  <td>
                    <p className="text-center">{person.name}</p>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <LinkedRoundedButton
                        href={`/people/${person.id}`}
                        icon="visibility"
                      />
                      <LinkedRoundedButton
                        href={`/people/edit/${person.id}`}
                        icon="edit"
                      />
                      <RoundedButton
                        icon="delete"
                        onClick={() => confirmDeletePerson(person.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <SectionTitle
          className="my-4"
          title="Eventos"
          icon="add"
          href="/events/create"
        />
        <table className="mt-4">
          <thead>
            <tr>
              <th>Título</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {localEvents.length === 0 ? (
              <tr>
                <td className="text-center" colSpan={4}>
                  Não há eventos registrados
                </td>
              </tr>
            ) : (
              localEvents.map((event) => (
                <tr key={event.id} className="even:bg-gray-100">
                  <td>
                    <p className="text-center">{event.title}</p>
                  </td>
                  <td>
                    <p className="text-center">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td>
                    <p className="text-center">
                      {new Date(event.date).toLocaleTimeString()}
                    </p>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <LinkedRoundedButton
                        href={`/events/${event.id}`}
                        icon="visibility"
                      />
                      <LinkedRoundedButton
                        href={`/events/edit/${event.id}`}
                        icon="edit"
                      />
                      <RoundedButton
                        icon="delete"
                        onClick={() => confirmDeleteEvent(event.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const people = await personService.getAll();
  const events = await eventService.getAll();
  return {
    props: { people, events },
  };
};
