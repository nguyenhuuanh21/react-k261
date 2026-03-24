import React from "react";
import { useParams } from "react-router-dom";
const Home = () => {
  //   const params = useParams();
  //   const id = params.id;
  const { id } = useParams();
  return (
    <>
      <div>Home</div>
      <div>ID: {id}</div>
    </>
  );
};

export default Home;
