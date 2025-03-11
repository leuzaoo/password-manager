import React from "react";

type Props = {
  label?: string;
  placeholder: string;
  type: string;
  value: string;
  className?: string;
  labelStyle?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const mainStyle = "max-w-80 rounded-lg border border-neutral-600 py-4 pl-2 ";

const MainInput = ({
  label,
  placeholder,
  type,
  value,
  className,
  onChange,
  labelStyle,
}: Props) => {
  return (
    <>
      <label className={labelStyle}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        className={mainStyle + className}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default MainInput;
