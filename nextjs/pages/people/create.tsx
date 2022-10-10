import { personService, eventService } from "services";
import type { GetServerSideProps, NextPage } from "next";
import LinkedRoundedButton from "components/LinkedRoundedButton";
import { useState } from "react";
import type { Event } from "types";
import ensure from "helpers/ensure";
import SectionTitle from "components/SectionTitle";

interface Props {
  events: Event[];
}

const Create: NextPage<Props> = ({ events }) => {
  const [name, setName] = useState("");
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const params = { name };
    const response = await personService.create(params);
    if (response?.failed) {
      alert(
        `Houve um erro na sua submissão: ${response.status} ${response.error}`
      );
    } else {
      setName("");
      joinedEvents.forEach(async (eventId) => {
        await personService.joinEvent(response.id, eventId);
      });
      setJoinedEvents([]);
      alert(`Pessoa criada com sucesso`);
    }
  };

  const addEventToJoined = (eventId: number) => {
    if (!joinedEvents.includes(eventId)) {
      setJoinedEvents([...joinedEvents, eventId]);
    }
  };
  const removeEventFromJoined = (eventId: number) => {
    setJoinedEvents(joinedEvents.filter((id) => id != eventId));
  };

  return (
    <div className="container">
      <div>
      <LinkedRoundedButton
          href={`/`}
          icon="arrow_back"
        />
        <SectionTitle title="Criar Pessoa" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="my-4 flex gap-4 items-center">
              Nome:
              <input
                className="input-teal"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>Eventos Disponíveis</label>
            <table className="mt-0">
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="cursor-pointer hover:bg-green-200"
                    onClick={() => addEventToJoined(event.id)}
                  >
                    <td>
                      <p>{event.title}</p>
                    </td>
                    <td>
                      <p>{new Date(event.date).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p>{new Date(event.date).toLocaleTimeString()}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <label className="mt-4">Eventos Agendados</label>
            <div className="flex flex-wrap gap-x-4">
              {joinedEvents.length === 0 ? (
                <p className="font-bold">Nenhum evento agendado</p>
              ) : (
                joinedEvents.map((eventId) => (
                  <span
                    key={eventId}
                    className="flex items-center gap-4 p-2 mb-2 bg-gray-200 rounded-md w-fit cursor-pointer hover:bg-red-200"
                    onClick={() => removeEventFromJoined(eventId)}
                  >
                    {ensure(events.find((event) => event.id == eventId)).title}
                  </span>
                ))
              )}
            </div>
            <input
              type="submit"
              className="button-teal rounded-lg mt-4"
              value="Criar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Create;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const events = await eventService.getAll();
  return {
    props: { events },
  };
};
