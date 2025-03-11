"use client";

import React, { useState } from "react";

import { PlusCircleIcon } from "lucide-react";

import PasswordTable from "@/app/components/ui/table";
import AddModal from "@/app/components/ui/add-modal";

const PasswordsPage = () => {
  const [platform, setPlatform] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSave = () => {};

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
          />
        </div>
      )}

      <PasswordTable />
    </div>
  );
};

export default PasswordsPage;
