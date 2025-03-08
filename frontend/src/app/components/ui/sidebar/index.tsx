"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutDashboardIcon,
  LockKeyholeIcon,
  LockKeyholeOpenIcon,
  LogOutIcon,
  UserCircle2Icon,
} from "lucide-react";

import { useAuthStore } from "@/app/store/auth.store";

const menuItems = [
  {
    label: "Visão geral",
    to: "/dashboard",
    icon: <LayoutDashboardIcon strokeWidth={1.5} width={24} />,
  },
  {
    label: "Minhas senhas",
    to: "/dashboard/senhas",
    icon: <LockKeyholeIcon strokeWidth={1.5} width={24} />,
  },
];

const Sidebar = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuthStore();

  const handleHideNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = async () => {
    await logout();

    setTimeout(() => {
      router.push("/login");
    });
  };

  return (
    <div
      className={`border-primary-white/10 flex h-screen flex-col items-center justify-between border-r py-4 transition-all duration-500 ease-in-out ${showNavbar ? "w-56" : "w-28"}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LockKeyholeOpenIcon className="text-green-400" size={28} />{" "}
            <h1 className="sr-only">PassVault</h1>
          </div>
          <button className="cursor-pointer" onClick={handleHideNavbar}>
            {showNavbar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>
        </div>
        <div className="mt-10">
          <ul className="start flex flex-col space-y-3">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.to}>
                <li
                  className={`flex items-center justify-start transition-all duration-500 ease-in-out ${
                    item.to === pathname
                      ? "bg-primary-white text-primary-dark max-w-max rounded-full px-5 py-2 font-bold"
                      : "py-2 font-light"
                  }`}
                >
                  <div>
                    {!showNavbar ? (
                      <p>{item.icon}</p>
                    ) : (
                      <p className={`flex justify-start gap-2`}>
                        {item.icon} {item.label}
                      </p>
                    )}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          <hr className="my-10 opacity-10" />
          {showNavbar ? (
            <div>
              <p className="font-light tracking-widest uppercase">Conta</p>
              <div className="mt-3 flex items-center gap-3 py-3 font-light">
                <UserCircle2Icon size={28} strokeWidth={1.5} />
                {user?.email}
              </div>
            </div>
          ) : (
            <UserCircle2Icon strokeWidth={1.5} size={28} />
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full max-w-max cursor-pointer rounded-lg bg-white px-6 py-3 text-neutral-950 transition-all duration-300 ease-in-out hover:opacity-60"
      >
        {showNavbar ? <p>Sair da conta</p> : <LogOutIcon />}
      </button>
    </div>
  );
};

export default Sidebar;
