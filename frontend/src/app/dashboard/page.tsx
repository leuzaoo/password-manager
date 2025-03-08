"use client";

import React, { useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";

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
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className="bg-primary-white h-20 w-full max-w-64"></div>
        <div className="bg-primary-white h-20 w-full max-w-64"></div>
        <div className="bg-primary-white h-20 w-full max-w-64"></div>
        <div className="bg-primary-white h-20 w-full max-w-64"></div>
      </div>
    </>
  );
};

export default DashboardPage;
