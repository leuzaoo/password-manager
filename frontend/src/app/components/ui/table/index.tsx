import { PencilIcon, TrashIcon } from "lucide-react";

interface Password {
  id: string;
  platform: string;
  login: string;
  password: string;
}

interface Props {
  passwords: Password[];
}

const PasswordTable = ({ passwords }: Props) => {
  return (
    <>
      <table className="mt-5 table">
        <thead>
          <tr>
            <th>Conta</th>
            <th>Login</th>
            <th>Senha</th>
            <th>Adicionado em</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((password) => (
            <tr key={password.id}>
              <td>{password.platform}</td>
              <td>{password.login}</td>
              <td>{password.password}</td>
              <td>4 dias atrás</td>
              <td className="flex gap-3">
                <button>
                  <PencilIcon size={18} />
                </button>
                <button>
                  <TrashIcon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PasswordTable;
