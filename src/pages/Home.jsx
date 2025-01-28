import { Link } from "react-router-dom";
import { useState } from 'react'
import ScanButton from "../components/ScanButton";

function Home() {
  return (
    <>
      <h1>Digital Product Passport</h1>
      <ScanButton />
    </>
  )
}

export default Home;
