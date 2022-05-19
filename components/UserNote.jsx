import useTimeAgo from "hooks/useTimeAgo";
import Image from "next/image";
import React from "react";

const UserNote = ({ note }) => {
  const { avatar, username, content, likescount, createdAt, userId, id } = note;
  const time = useTimeAgo(createdAt);
  return (
    <div className="flex gap-4 items-center pb-4 pl-4 mb-4 border-b-[1px]  ">
      <Image
        height={49}
        width={49}
        src={avatar}
        alt={username}
        className="rounded-full"
      />
      <div>
        <div>
          <strong>{username}</strong>
          <span> - </span>
          <time className="text-gray-500">{time}</time>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default UserNote;
