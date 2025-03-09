import { CheckIcon, XIcon } from "lucide-react";

type Props = {
  password: string;
};

const PasswordCriteria = ({ password }: Props) => {
  const criteria = [
    { label: "Mínimo 6 caracteres", met: password.length >= 6 },
    { label: "Conter uma letra maiúscula", met: /[A-Z]/.test(password) },
    { label: "Conter uma letra minúscula", met: /[a-z]/.test(password) },
    { label: "Conter um número", met: /\d/.test(password) },
    {
      label: "Conter um caracter especial",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <CheckIcon className="mr-2 size-4 text-green-500" />
          ) : (
            <XIcon className="mr-2 size-4 text-gray-500" />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const StrengthPassword = ({ password }: Props) => {
  const getStrength = (pass: string = "") => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;

    return strength;
  };

  const strength: number = getStrength(password);

  const getColor = (strength: number) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-green-300";
    return "bg-green-600";
  };

  const getStrengthText = (strength: number) => {
    if (strength === 0) return "Muito fraca";
    if (strength === 1) return "Fraca";
    if (strength === 2) return "Está melhorando";
    if (strength === 3) return "Quase ideal";
    return "Muito forte";
  };

  return (
    <>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-gray-400">Nível de segurança</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : "bg-gray-600"} `}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </>
  );
};

export default StrengthPassword;
