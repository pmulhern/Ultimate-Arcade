import React from "react";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
      window.loadBackground();
    })
return <h1 id="home">Home Page</h1>;
}

export default Home;