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

  const { login, isLoading } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    router.push(callbackUrl);
  };

  const renderLoader = () => (
    <div className="flex justify-center rounded-lg bg-white py-4 text-black">
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleLogin} className="mt-5 min-w-2xs space-y-5">
      <div className="flex flex-col gap-1">
        <MainInput
          placeholder="seuemail@mail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Email"
          type="mail"
          className="bg-primary-white/10"
        />
      </div>
      <div className="flex flex-col gap-1">
        <MainInput
          placeholder="mínimo 6 caracteres"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          label="Senha"
          type="password"
          className="bg-primary-white/10"
        />
      </div>

      {isLoading ? (
        renderLoader()
      ) : (
        <MainButton type="submit">Entrar</MainButton>
      )}
    </form>
  );

  return (
    <section className="mx-auto flex h-screen w-screen flex-col items-center justify-center bg-black/50 px-4">
      <h1 className="text-5xl font-bold">
        <span className="font-light opacity-80">Pass</span>Vault
      </h1>
      <p className="mt-3 text-sm font-light">
        Salve suas senhas | Livre-se de preocupações
      </p>
      <hr className="border-primary-white mt-5 w-full max-w-2xs min-w-2xs border-t opacity-30" />
      <h1 className="mt-5 text-2xl">Acesse sua conta</h1>
      <p className="text-sm font-light">
        Ainda não tem uma conta?{" "}
        <Link href="/signup" className="text-blue-400 hover:underline">
          Crie agora
        </Link>
        .
      </p>

      {renderForm()}
    </section>
  );
};

export default LoginPage;
