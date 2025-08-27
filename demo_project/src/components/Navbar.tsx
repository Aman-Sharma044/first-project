import React from "react";
import { memo } from "react";
interface Props {
  adj: string;
  changeAdjective: () => void;
}

const Navbar: React.FC<Props> = ({ adj, changeAdjective }) => {
  console.log("rendered");

  return (
    <>
      <div>i am {adj}</div>
      <button
        onClick={() => {
          changeAdjective();
        }}
      >
        reset the count
      </button>
    </>
  );
};
export default memo(Navbar);
