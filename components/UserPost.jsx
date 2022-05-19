import useTimeAgo from "hooks/useTimeAgo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const UserPost = ({ post }) => {
  const { avatar, username, content, likescount, createdAt, userId, id } = post;
  const time = useTimeAgo(createdAt);
  const router = useRouter();

  const handleClickArticle = (e) => {
    e.preventDefault();
    router.push(`/posts/${id}`);
  };

  return (
    <article
      onClick={handleClickArticle}
      className="flex gap-4 items-center py-4 pl-4  border-b-[1px] hover:bg-gray-100 cursor-pointer "
    >
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
          <Link href={`/posts/${id}`}>
            <a className="hover:underline">
              <time className="text-gray-500">{time}</time>
            </a>
          </Link>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </article>
  );
};

export default UserPost;
