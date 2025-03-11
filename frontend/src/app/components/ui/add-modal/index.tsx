import React from "react";
import { SquarePlusIcon } from "lucide-react";

import Button from "@/app/components/common/button";
import MainInput from "@/app/components/ui/input";

interface Props {
  loginValue: string;
  loginOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
  passwordOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  platformValue: string;
  platformOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeButton: () => void;
  saveButton: () => void;
}

const AddModal = ({
  loginValue,
  loginOnChange,
  passwordValue,
  passwordOnChange,
  platformValue,
  platformOnChange,
  closeButton,
  saveButton,
}: Props) => {
  return (
    <div className="rounded-xl border-white/20 bg-white p-5 text-black">
      <SquarePlusIcon />

      <p className="mt-5 text-xl font-semibold">Cadastrar nova senha</p>
      <span className="text-sm opacity-50">Insira as informações abaixo</span>

      <form className="mt-5 flex flex-col space-y-3">
        <div className="flex flex-col">
          <MainInput
            className="!min-w-xs !p-2 text-sm"
            labelStyle="text-sm font-medium"
            label="Plataforma"
            placeholder={"Nubank, Instagram, OLX"}
            type={"text"}
            value={platformValue}
            onChange={platformOnChange}
          />
        </div>

        <div className="flex flex-col">
          <MainInput
            className="!min-w-xs !p-2 text-sm"
            labelStyle="text-sm font-medium"
            label="Login"
            placeholder={"Método de login na plataforma"}
            type={"text"}
            value={loginValue}
            onChange={loginOnChange}
          />
        </div>

        <div className="flex flex-col">
          <MainInput
            className="!min-w-xs !p-2 text-sm"
            labelStyle="text-sm font-medium"
            label="Senha"
            placeholder={"Garanta que ela é segura"}
            type="password"
            value={passwordValue}
            onChange={passwordOnChange}
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-5">
          <Button
            className="border-primary-dark/30 border !p-2 hover:opacity-80"
            onClick={closeButton}
          >
            Cancelar
          </Button>
          <Button
            className="bg-primary-blue !p-2 text-white hover:opacity-80"
            onClick={saveButton}
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
