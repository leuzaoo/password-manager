"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { CircleAlertIcon, SearchIcon, XIcon  } from "lucide-react";
import { usePassStore } from "@/app/store/passwords.store";

type Props = {
  value: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MobileHeader = ({ value, onChange }: Props) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex w-full items-center justify-between">
      {showSearch ? (
        ""
      ) : (
        <p className="text-xl font-semibold text-green-400">
          <span className="font-extralight">Pass</span>Vault
        </p>
      )}
      <button
        className="flex cursor-pointer justify-end"
        onClick={handleShowSearch}
      >
        {!showSearch && <SearchIcon />}
      </button>

      {showSearch && (
        <div className="flex h-7 w-full justify-between gap-3">
          <input
            className="w-full rounded-lg bg-white/10 p-4 text-sm font-light outline-none"
            placeholder="Nubank, Instagram"
            type="search"
            value={value}
            onChange={onChange}
          />
          <button
            className="cursor-pointer"
            onClick={() => setShowSearch(false)}
          >
            <XIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const DesktopHeader = ({ value, onChange }: Props) => {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <input
        className="bg-primary-white/10 w-full rounded-lg p-2 font-light outline-none"
        placeholder="Nubank, Instagram, Facebook"
        type="search"
        onChange={onChange}
        value={value}
      />

      <SearchIcon className="cursor-pointer" />
    </div>
  );
};

const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [passwordCount, setPasswordCount] = useState(0);

  const { getPassword, passwords } = usePassStore();

  useEffect(() => {
    const fetchPasswords = async () => {
      await getPassword();
      setPasswordCount(passwords.length);
    };

    fetchPasswords();
  }, [getPassword, passwords.length]);

  return (
    <>
      <header>
        <div className="md:hidden">
          <MobileHeader
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="hidden md:block">
          <DesktopHeader
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <section className="mt-10 gap-4">
        <h2 className="text-2xl font-medium">Visão geral</h2>

        <div className="text-primary-dark mt-5 grid w-full rounded-xl text-center">
          <div className="rounded-xl bg-white p-3">
            <p className="font-semibold">Senhas salvas</p>
            <span className="text-3xl">{passwordCount}</span>
          </div>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center">
          <p className="font-extralight">
            Essa página está em desenvolvimento.{" "}
            <Link
              className="text-primary-blue font-semibold underline"
              href="/dashboard/senhas"
            >
              Clique aqui
            </Link>{" "}
            para navegar a página &#34;Minhas senhas&#34;.
          </p>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
