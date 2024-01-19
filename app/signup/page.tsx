import React from "react";
import { styling1 } from "./commen";
import Signup from "../components/signup";

const page = () => {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center relative bg-gradient-to-tl bg-opacity-80 bg-blue-100 from-blue-400"
      style={styling1}
    >
      <div className="flex lg:w-3/4 w-11/12 mx-auto rounded-tl-2xl lg:flex-row flex-col rounded-br-2xl">
        <div className="lg:w-4/6 w-4/5 lg:relative bg-opacity-50 mx-auto lg:h-[560px] h-300px lg:p-0 p-3"></div>
        <div className="flex-grow bg-opacity-90 bg-slate-600 rounded-br-2xl p-4 relative">
          <Signup />
        </div>
      </div>
    </main>
  );
};

export default page;
