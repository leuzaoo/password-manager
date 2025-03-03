import React from "react";

type Props = {
  children: string;
  type?: "submit" | "button" | "reset";
};

const MainButton = ({ children, type = "button" }: Props) => {
  return (
    <button
      type={type}
      className="w-full cursor-pointer rounded-lg bg-neutral-100 py-4 text-neutral-900"
    >
      {children}
    </button>
  );
};

export default MainButton;
