import React from "react";

type HeroProps = {
  name: string;
};

const Header = ({ name }: HeroProps) => {
  return <h1 className="text-2xl font-semibold text-gray-700">{name}</h1>;
};

export default Header;
