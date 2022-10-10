import type { GetServerSideProps, NextPage } from "next";
import { eventService } from "services";
import type { Event } from "types";
import { useState } from "react";
import LinkedRoundedButton from "components/LinkedRoundedButton";
import SectionTitle from "components/SectionTitle";

interface Props {
  localEvent: Event;
}

const Edit: NextPage<Props> = ({ localEvent }) => {
  const [title, setTitle] = useState(localEvent.title);
  const [date, setDate] = useState(localEvent.date.slice(0, -1));

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await eventService.update(localEvent.id, {
      title,
      date: date + "Z",
    });
    if (response?.failed) {
      alert(
        `Houve um erro na sua submissão: ${response.status} ${response.error}`
      );
    } else {
      alert(`Evento alterado com sucesso`);
    }
  };

  return (
    <div className="container">
      <div>
      <LinkedRoundedButton
          href={`/`}
          icon="arrow_back"
        />
        <SectionTitle title="Editar Evento" />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="my-4 flex gap-4 items-center">
              Título:
              <input
                className="input-teal"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="my-4 flex gap-4 items-center">
              Data e Horário:
              <input
                className="input-teal"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value + ":00.000")}
              />
            </label>
            <input
              type="submit"
              className="button-teal mt-4"
              value="Editar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Edit;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const localEvent =
    params?.id && typeof params.id === "string"
      ? await eventService.getById(parseInt(params?.id))
      : null;
  return {
    props: { localEvent },
  };
};
