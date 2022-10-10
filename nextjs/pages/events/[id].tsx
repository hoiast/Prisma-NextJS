import type { GetServerSideProps, NextPage } from "next";
import { eventService } from "services";
import type { Event , Person} from "types";
import LinkedRoundedButton from "components/LinkedRoundedButton";
import SectionTitle from "components/SectionTitle";

interface Props {
  localEvent: Event;
  registeredPeople: Person[]
}

const Show: NextPage<Props> = ({ localEvent, registeredPeople }) => {
  const eventData = [
    { label: "ID", data: localEvent.id },
    { label: "Título", data: localEvent.title },
    { label: "Data", data: new Date(localEvent.date).toLocaleDateString() },
    {
      label: "Horário",
      data: new Date(localEvent.created_at).toLocaleTimeString(),
    },
    {
      label: "Criado em",
      data: new Date(localEvent.created_at).toLocaleString(),
    },
    {
      label: "Atualizado em ",
      data: new Date(localEvent.updated_at).toLocaleString(),
    },
  ];

  return (
    <div className="container">
      <div>
        <LinkedRoundedButton
          href={`/`}
          icon="arrow_back"
        />
        <SectionTitle title="Informações" icon="edit" href={`/events/edit/${localEvent.id}`} />
        <table>
          <tbody>
            {eventData.map((line) => (
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
        <h2 className="mt-4 text-2xl font-bold text-green-700">
          Pessoas Registradas
        </h2>
        <h4 className="mt-1 text-lg font-bold">
          Total: {registeredPeople.length} Pessoas
        </h4>
        <table>
          <tbody>
            {registeredPeople.length === 0 ? (
              <tr>
                <td className="text-center">
                  Não há pessoas registradas
                </td>
              </tr>
            ) : (
              registeredPeople.map((person) => (
                <tr key={person.id}>
                  <td>
                    <p className="text-center">{person.name}</p>
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
export default Show;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const localEvent =
    params?.id && typeof params.id === "string"
      ? await eventService.getById(parseInt(params?.id))
      : null;
  const registeredPeople =
    params?.id && typeof params.id === "string"
      ? await eventService.getPeople(parseInt(params?.id))
      : null;
  return {
    props: { localEvent, registeredPeople },
  };
};
