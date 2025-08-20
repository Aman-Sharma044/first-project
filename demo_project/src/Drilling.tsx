import React from "react";
type Good = {
  title: string;
  isActive: boolean;
};

const Drilling: React.FC<Good> = ({ title, isActive }) => {
  return (
    <h1>
      {title} - {isActive ? "Active" : "Inactive"}
    </h1>
  );
};
export default Drilling;
