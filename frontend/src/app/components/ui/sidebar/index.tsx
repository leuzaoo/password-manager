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
    icon: <LayoutDashboardIcon />,
  },
  {
    label: "Minhas senhas",
    to: "/dashboard/senhas",
    icon: <LockKeyholeIcon />,
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
      className={`flex h-screen flex-col justify-between bg-green-950/60 py-4 pl-4 ${showNavbar ? "w-72" : "w-20"} transition-all duration-500 ease-in-out`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LockKeyholeOpenIcon className="text-green-400" size={28} />{" "}
            <div
              className={`${showNavbar ? "opacity-100" : "opacity-0"} transition-all duration-700 ease-in-out`}
            >
              {showNavbar && <p className="text-xl font-light">PassVault</p>}
            </div>
          </div>
          <button className="cursor-pointer pr-2" onClick={handleHideNavbar}>
            {showNavbar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>
        </div>
        <div className="mt-10">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={`py-2 text-lg font-light hover:border-r-6 hover:border-green-400/50 ${
                  pathname === item.to ? "border-r-6" : ""
                }`}
              >
                <Link href={item.to} className="flex items-center gap-3">
                  {item.icon}
                  <p
                    className={`transition-all duration-1000 ease-in-out ${showNavbar ? "opacity-100" : "opacity-0"}`}
                  >
                    {showNavbar && item.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <hr className="my-10 opacity-20" />
          {showNavbar && (
            <div>
              <p className="font-light tracking-widest uppercase">Conta</p>
              <div className="mt-3 flex items-center gap-3 py-3 font-light">
                <UserCircle2Icon size={28} />
                {user?.email}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`${showNavbar ? "pr-4" : "pr-4"}`}>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer justify-center rounded-lg bg-white py-3 text-neutral-950 transition-all duration-300 ease-in-out hover:opacity-60"
        >
          {showNavbar ? <p>Sair</p> : <LogOutIcon />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
