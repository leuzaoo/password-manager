"use client";

import React, { useState, useEffect } from "react";

import { usePassStore } from "../../store/passwords.store";
import { PlusCircleIcon } from "lucide-react";

import PasswordTable from "@/app/components/ui/table";
import AddModal from "@/app/components/ui/add-modal";

interface PasswordType {
  id: string;
  platform: string;
  login: string;
  password: string;
}

const PasswordsPage = () => {
  const [platform, setPlatform] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPasswordId, setEditingPasswordId] = useState<string | null>(
    null,
  );

  const { addPassword, getPassword, passwords, isLoading, updatePassword } =
    usePassStore();

  useEffect(() => {
    getPassword();
  }, [getPassword]);

  const handleShowModal = () => {
    setEditingPasswordId(null);
    setPlatform("");
    setLogin("");
    setPassword("");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editingPasswordId) {
      await updatePassword(editingPasswordId, platform, login, password);
    } else {
      await addPassword(platform, login, password);
    }

    setPlatform("");
    setLogin("");
    setPassword("");
    setShowModal(false);
    getPassword();
  };

  const handleEdit = (password: PasswordType) => {
    setEditingPasswordId(password.id);
    setPlatform(password.platform);
    setLogin(password.login);
    setPassword(password.password);
    setShowModal(true);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Minhas senhas</h2>
        <button
          onClick={handleShowModal}
          className="text-primary-dark flex cursor-pointer items-center gap-2 rounded-md bg-white p-2 px-3 font-medium"
        >
          Adicionar <PlusCircleIcon size={20} strokeWidth={1.5} />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <AddModal
            platformValue={platform}
            loginValue={login}
            passwordValue={password}
            platformOnChange={(e) => setPlatform(e.target.value)}
            loginOnChange={(e) => setLogin(e.target.value)}
            passwordOnChange={(e) => setPassword(e.target.value)}
            closeButton={() => setShowModal(false)}
            saveButton={handleSave}
            isEdit={!!editingPasswordId}
          />
        </div>
      )}

      {isLoading ? (
        <p>Carregando senhas</p>
      ) : (
        <PasswordTable passwords={passwords} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default PasswordsPage;
