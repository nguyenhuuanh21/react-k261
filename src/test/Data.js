import React from "react";
import { useSearchParams } from "react-router-dom";
const Data = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  const address = searchParams.get("address");
  return (
    <>
      <h1>Data</h1>
      <div>name : {name}</div>
      <div>age : {age}</div>
      <div>address : {address}</div>
    </>
  );
};

export default Data;
