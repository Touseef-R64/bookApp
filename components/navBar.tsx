import React from "react";

type Props = {
  title?: string;
};

const Navbar = ({ title }: Props) => {
  return (
    <header className="w-full h-[50px] bg-secondary-200 ">
      <nav className="flex px-[40px] h-full w-full items-center">
        <p className="leading-[37px] text-[23px] font-[600] text-white">
          {title}
        </p>
      </nav>
    </header>
  );
};

export default Navbar;
