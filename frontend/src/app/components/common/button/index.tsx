import React from "react";

interface MainButtonProps {
  children: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
}

const MainButton = ({
  children,
  type = "button",
  onClick,
}: MainButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full cursor-pointer rounded-lg bg-neutral-100 py-4 text-neutral-900"
    >
      {children}
    </button>
  );
};

export default MainButton;
