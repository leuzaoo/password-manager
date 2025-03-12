import { PencilIcon, TrashIcon } from "lucide-react";
import { usePassStore } from "@/app/store/passwords.store";

interface Password {
  id: string;
  platform: string;
  login: string;
  password: string;
}

interface Props {
  passwords: Password[];
  onEdit: (password: Password) => void;
}

const PasswordTable = ({ passwords, onEdit }: Props) => {
  const { deletePassword } = usePassStore();

  const handleDelete = async (id: string) => {
    if (confirm("Certeza que quer excluir esta conta?"))
      await deletePassword(id);
  };

  return (
    <div>
      {passwords.length > 0 ? (
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
                  <button onClick={() => onEdit(password)}>
                    <PencilIcon size={18} />
                  </button>
                  <button onClick={() => handleDelete(password.id)}>
                    <TrashIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-5 text-xl font-extralight">
          Cadastre uma senha para exibir aqui.
        </p>
      )}
    </div>
  );
};

export default PasswordTable;
