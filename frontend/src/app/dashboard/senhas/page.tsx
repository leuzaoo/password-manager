import React from "react";
import PasswordTable from "@/app/components/ui/table";

const PasswordsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-medium">Minhas senhas</h2>

      <PasswordTable />
    </div>
  );
};

export default PasswordsPage;
