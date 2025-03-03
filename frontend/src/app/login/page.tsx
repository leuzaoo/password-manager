import React from "react";
import MainButton from "../components/common/button";
import MainInput from "../components/ui/input";

const LoginPage = () => {
  return (
    <section className="mx-auto flex h-screen w-screen max-w-7xl flex-col items-center justify-center">
      <h1 className="text-5xl font-semibold">Access your account.</h1>

      <form className="mx-auto mt-10 space-y-5">
        <div className="flex flex-col gap-1">
          <MainInput label="Email" type="mail" />
        </div>
        <div className="flex flex-col gap-1">
          <MainInput label="Password" type="password" />
        </div>

        <MainButton type="submit">Login</MainButton>
      </form>
    </section>
  );
};

export default LoginPage;
