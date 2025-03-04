"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

import { useAuthStore } from "../store/auth.store";

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

    setTimeout(() => {
      router.push(callbackUrl);
    }, 500);
  };

  return (
    <section className="mx-auto flex h-screen w-screen max-w-7xl flex-col items-center justify-center">
      <h1 className="text-5xl font-semibold">Access your account.</h1>
      <p>
        Don&apos;t have account yet?{" "}
        <Link href="/signup" className="text-blue-400 hover:underline">
          Click here to create
        </Link>
        .
      </p>

      <form onSubmit={handleLogin} className="mx-auto mt-10 space-y-5">
        <div className="flex flex-col gap-1">
          <MainInput
            placeholder="youremail@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="mail"
          />
        </div>
        <div className="flex flex-col gap-1">
          <MainInput
            placeholder="must have 6 characters"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Password"
            type="password"
          />
        </div>

        {isLoading ? (
          <MainButton type="button">Loading...</MainButton>
        ) : (
          <MainButton type="submit">Login</MainButton>
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
