import React from "react";

interface MainButtonProps {
  children: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
}

const mainStyle =
  "w-full cursor-pointer rounded-lg bg-neutral-100 py-4 text-neutral-900 ";

const MainButton = ({
  children,
  type = "button",
  onClick,
  className,
}: MainButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${mainStyle + className}`}
    >
      {children}
    </button>
  );
};

export default MainButton;
