import { PencilIcon, TrashIcon } from "lucide-react";

const PasswordTable = () => {
  return (
    <>
      <table className="mt-5 table">
        <thead>
          <tr>
            <th>Conta</th>
            <th>Senha</th>
            <th>Adicionado em</th>
            <th>Categoria</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Youtube</td>
            <td>*********</td>
            <td>4 dias atrás</td>
            <td>Redes sociais</td>
            <td className="flex gap-3">
              <PencilIcon />
              <TrashIcon />
            </td>
          </tr>
          <tr>
            <td>Itaú</td>
            <td>*********</td>
            <td>1 mês atrás</td>
            <td>Bancos</td>
            <td className="flex gap-3">
              <PencilIcon />
              <TrashIcon />
            </td>
          </tr>
          <tr>
            <td>Free Fire</td>
            <td>*********</td>
            <td>3 meses atrás</td>
            <td>Jogos</td>
            <td className="flex gap-3">
              <PencilIcon />
              <TrashIcon />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PasswordTable;
