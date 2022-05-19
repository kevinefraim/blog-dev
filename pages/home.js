import UserPost from "components/UserPost";
import { fetchLatestPosts, listenLatestPosts } from "fb/client";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import Navbar from "components/Navbar";
import Avatar from "components/Avatar";

const Home = () => {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();
  useEffect(() => {
    let unsubcribe;
    if (user) {
      unsubcribe = listenLatestPosts(setTimeline);
    }
    return () => unsubcribe && unsubcribe();
    // user && fetchLatestPosts().then(setTimeline);
  }, [user]);
  return (
    <>
      <header className="bg-[#ffffffaa] backdrop-blur-sm z-10 h-[70px] border-b-[1px]  py-4 px-4  sticky top-0 w-full flex justify-between items-center">
        <h1 className="text-2xl font-extrabold ">Inicio</h1>
        {user !== undefined ? (
          <Avatar user={user} />
        ) : (
          <div className="border-2 rounded-full h-[50px] w-[50px]"></div>
        )}
      </header>
      <section className="flex-1">
        {timeline?.map((post) => (
          <UserPost key={post.id} post={post} />
        ))}
      </section>
      <Navbar />
    </>
  );
};

export default Home;
