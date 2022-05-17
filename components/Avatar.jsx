import React from "react";
import Image from "next/image";

const Avatar = ({ user, text }) => {
  return (
    <div className="flex items-center">
      <Image
        width={50}
        height={50}
        src={user.avatar}
        alt={user.username}
        className="rounded-full"
      />
      {text && <strong className="ml-2">{text}</strong>}
    </div>
  );
};

export default Avatar;
