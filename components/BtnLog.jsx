import React from "react";

const BtnLog = ({ handleClick, provider }) => {
  return (
    <button
      className={`text-white bg-red-500 text-base rounded-full cursor-pointer text-extrabold py-1 px-4 transition-opacity hover:opacity-[0.3]`}
      onClick={() => handleClick(provider)}
    >
      Entrar con {provider}
    </button>
  );
};

export default BtnLog;
