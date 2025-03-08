"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

import { useAuthStore } from "../store/auth.store";
import { LoaderCircleIcon } from "lucide-react";

import MainButton from "../components/common/button";
import MainInput from "../components/ui/input";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { signup, isLoading } = useAuthStore();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password);
    if (!useAuthStore.getState().error) {
      router.push("/dashboard");
    }
  };

  const renderLoader = () => (
    <div className="flex justify-center rounded-lg bg-white py-4 text-black">
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSignup} className="mt-5 min-w-2xs space-y-5">
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

      <p className="font-light">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Entrar agora
        </Link>
        .
      </p>

      {isLoading ? (
        renderLoader()
      ) : (
        <MainButton type="submit">Criar conta</MainButton>
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
      <hr className="border-primary-white mt-5 min-w-2xs border-t opacity-30" />
      <h2 className="mt-5 text-2xl">Crie sua conta</h2>

      {renderForm()}
    </section>
  );
};

export default SignupPage;
