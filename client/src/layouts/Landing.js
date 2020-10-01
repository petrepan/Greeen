import React from "react";
import Navbar from "./Navbar";
import Posts from "../components/posts/Posts";
import PostShim from "./PostShim";
import ProfileShim from "./ProfileShim";

const Landing = () => {
  return (
    <div>
      <Navbar />
          <Posts />
    </div>
  );
};

export default Landing;
