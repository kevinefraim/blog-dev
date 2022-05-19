import UserPost from "components/UserPost";
import React from "react";

const PostPage = (props) => {
  return (
    <UserPost post={props} />
    // <h1>ff</h1>
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
