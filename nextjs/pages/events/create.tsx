import { eventService } from "services";
import type { NextPage } from "next";
import { useState } from "react";
import LinkedRoundedButton from "components/LinkedRoundedButton";
import SectionTitle from "components/SectionTitle";

const Create: NextPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, -7) + "00.000"
  );

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await eventService.create({ title, date: date + "Z" });
    if (response?.failed) {
      alert(
        `Houve um erro na sua submissão: ${response.status} ${response.error}`
      );
    } else {
      setTitle("");
      alert(`Evento criado com sucesso`);
    }
  };

  return (
    <div className="container">
      <div>
      <LinkedRoundedButton
          href={`/`}
          icon="arrow_back"
        />
        <SectionTitle title="Criar Evento" />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="my-4 flex gap-4 items-center">
              Título:
              <input
                className="input-teal"
                required
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
              value="Criar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Create;
