import React, { useEffect } from "react";

const Fetch: React.FC = () => {
  const getData = async () => {
    const res = await fetch("https://api.github.com/users/octocat");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Check console for fetched data</h1>
    </div>
  );
};

export default Fetch;
