import React from "react";

type Props = {
  label: string;
  type: string;
};

const MainInput = ({ label, type }: Props) => {
  return (
    <>
      <label>{label}</label>
      <input
        className="w-80 rounded-lg border border-neutral-600 py-4 pl-2"
        type={type}
        placeholder="must be have 6 characters"
      />
    </>
  );
};

export default MainInput;
