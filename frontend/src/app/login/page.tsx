"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

import { useAuthStore } from "../store/auth.store";
import { LoaderCircleIcon } from "lucide-react";

import MainButton from "../components/common/button";
import MainInput from "../components/ui/input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await login(email, password);
    router.push(callbackUrl || "/dashboard");
  };

  return (
    <section className="mx-auto flex h-screen w-screen max-w-7xl flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        <span className="font-light opacity-80">Pass</span>Vault
      </h1>
      <p className="font-light">Salve suas senhas | Livre-se de preocupações</p>

      <form onSubmit={handleLogin} className="mx-auto mt-10 space-y-5">
        <div className="flex flex-col gap-1">
          <MainInput
            placeholder="seuemail@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="mail"
          />
        </div>
        <div className="flex flex-col gap-1">
          <MainInput
            placeholder="mínimo 6 caracteres"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Senha"
            type="password"
          />
        </div>

        <p className="font-light">
          Ainda não tem uma conta?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Crie agora
          </Link>
          .
        </p>

        {isLoading ? (
          <div className="flex justify-center rounded-lg bg-white py-4 text-black">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        ) : (
          <MainButton type="submit">Entrar</MainButton>
        )}

        {error && (
          <div className="mt-4 mb-6 flex items-center gap-2 text-sm text-red-600">
            <p className="font-semibold">{error}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default LoginPage;
