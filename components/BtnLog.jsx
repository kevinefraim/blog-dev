import classNames from "classnames";
import React from "react";
import GithubIcon from "./svg/github-icon";
import GoogleIcon from "./svg/google-icon";

const BtnLog = ({ handleClick, provider }) => {
  return (
    <button
      className={classNames(
        "text-white bg-red-500 text-base rounded-full cursor-pointer text-extrabold py-1 px-4 transition-opacity hover:opacity-[0.3] flex gap-2 justify-center items-center",
        {
          "bg-gray-400 text-black": provider === "github",
        },
        {
          "bg-blue-600": provider === "google",
        }
      )}
      onClick={() => handleClick(provider)}
    >
      Entrar con {provider}
      {provider === "github" ? (
        <GithubIcon stroke="#000" />
      ) : (
        <GoogleIcon fill="#f00" />
      )}
    </button>
  );
};

export default BtnLog;
