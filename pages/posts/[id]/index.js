import React from "react";
import UserPost from "components/UserPost";
import Navbar from "components/Navbar";

const PostPage = (props) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex-1">
        <UserPost post={props} />
      </div>
      <Navbar />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params, res } = context;
  const { id } = params;

  const apiRes = await fetch(`http://localhost:3000/api/posts/${id}`);
  if (apiRes.ok) {
    const props = await apiRes.json();
    return { props };
  }
  if (res) {
    res.writeHead(301, { Location: "/home" }).end();
  }
};

export default PostPage;
