"use client";

import {
  LayoutDashboardIcon,
  LockKeyholeIcon,
  LockKeyholeOpenIcon,
  UserCircle2Icon,
} from "lucide-react";
import MainButton from "../../common/button";
import { useAuthStore } from "@/app/store/auth.store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const menuItems = [
  {
    label: "Visão geral",
    to: "/",
    icon: <LayoutDashboardIcon />,
  },
  {
    label: "Minhas senhas",
    to: "/senhas",
    icon: <LockKeyholeIcon />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();

    setTimeout(() => {
      router.push("/login");
    });
  };

  return (
    <div className="flex h-screen w-full min-w-72 flex-col justify-between bg-green-950/60 p-4">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-light">
          <LockKeyholeOpenIcon className="text-green-400" size={20} /> PassVault
        </h1>
        <div className="mt-10">
          <p className="font-light tracking-widest uppercase">Menu</p>
          <ul className="mt-3">
            {menuItems.map((item) => (
              <li
                key={item.label}
                className="rounded-tr-sm rounded-br-sm border-green-400 py-3 text-lg font-light hover:border-r-6"
              >
                <Link href={item.to}>
                  <p className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <hr className="my-10 opacity-20" />
          <div>
            <p className="font-light tracking-widest uppercase">Conta</p>
            <p className="mt-3 flex items-center gap-3 py-3 font-light">
              <UserCircle2Icon size={28} />
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <MainButton
        type="button"
        onClick={handleLogout}
        className="transition-all duration-300 ease-in-out hover:opacity-60"
      >
        Sair
      </MainButton>
    </div>
  );
};

export default Sidebar;
