import type { GetServerSideProps, NextPage } from "next";
import { personService, eventService } from "services";
import type { Person, Event } from "types";
import { useState } from "react";
import LinkedRoundedButton from "components/LinkedRoundedButton";
import SectionTitle from "components/SectionTitle";

interface Props {
  person: Person;
}

const Edit: NextPage<Props> = ({ person }) => {
  const [name, setName] = useState(person.name);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const params = { name };
    const response = await personService.update(person.id, params);
    if (response?.failed) {
      alert(
        `Houve um erro na sua submissão: ${response.status} ${response.error}`
      );
    } else {
      alert(`Pessoa alterada com sucesso`);
    }
  };

  return (
    <div className="container">
      <div>
      <LinkedRoundedButton
          href={`/`}
          icon="arrow_back"
        />
        <SectionTitle title="Editar Pessoa" />
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
  const person =
    params?.id && typeof params.id === "string"
      ? await personService.getById(parseInt(params?.id))
      : null;
  return {
    props: { person },
  };
};
