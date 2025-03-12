"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  LayoutDashboardIcon,
  LockKeyholeIcon,
  UserCircle2Icon,
} from "lucide-react";

const menuItems = [
  {
    id: 1,
    to: "/dashboard",
    icon: <LayoutDashboardIcon strokeWidth={1.5} width={24} />,
  },
  {
    id: 2,
    to: "/dashboard/senhas",
    icon: <LockKeyholeIcon strokeWidth={1.5} width={24} />,
  },
  {
    id: 3,
    to: "/dashboard/conta",
    icon: <UserCircle2Icon strokeWidth={1.5} width={24} />,
  },
];

const MobileNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <nav
        className={`fixed bottom-4 w-10/12 rounded-xl bg-white p-2 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-20"} md:hidden`}
      >
        <ul className="flex justify-around text-gray-700">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.to}
              className={`transition-all duration-500 ease-in-out ${item.to === pathname ? "bg-primary-dark rounded-full p-2 text-white" : "p-2"}`}
            >
              <li>{item.icon}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavbar;
