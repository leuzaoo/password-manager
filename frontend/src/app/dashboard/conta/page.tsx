import { CircleAlertIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyAccountPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-3">
        <CircleAlertIcon className="text-primary-alert" size={36} />
        <p className="text-3xl">Página em construção</p>
      </div>
      <hr className="border-primary-white/10 mt-5 min-w-96" />
      <Link
        className="bg-primary-white text-primary-dark mt-5 rounded-lg px-5 py-3 font-semibold"
        href="/dashboard/senhas"
      >
        Minhas senhas
      </Link>
    </div>
  );
};

export default MyAccountPage;
