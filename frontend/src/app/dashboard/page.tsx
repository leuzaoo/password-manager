"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "../store/auth.store";

import MainButton from "../components/common/button";

const DashboardPage = () => {
  const { logout } = useAuthStore();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    setTimeout(() => {
      router.refresh();
    }, 500);
  };
  return (
    <>
      <div>DashboardPage</div>
      <MainButton type="button" onClick={handleLogout}>
        Sair
      </MainButton>
    </>
  );
};

export default DashboardPage;
