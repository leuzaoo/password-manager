import React from "react";

type Props = {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MainInput = ({ label, placeholder, type, value, onChange }: Props) => {
  return (
    <>
      <label>{label}</label>
      <input
        onChange={onChange}
        value={value}
        className="w-80 rounded-lg border border-neutral-600 py-4 pl-2"
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default MainInput;
