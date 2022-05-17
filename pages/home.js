import AppLayout from "components/AppLayout";
import UserNote from "components/UserNote";
import { fetchLatestNotes } from "fb/client";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import CreateIcon from "components/svg/create-icon";
import Link from "next/link";
import HomeIcon from "components/svg/home-icon";
import SearchIcon from "components/svg/search-icon";
import Navbar from "components/Navbar";

const Home = () => {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();
  useEffect(() => {
    user && fetchLatestNotes().then(setTimeline);
  }, [user]);
  console.log(timeline);
  return (
    <AppLayout>
      <header className="bg-[#ffffffaa] backdrop-blur-sm z-10 h-[40px] border-b-[1px] mb-4 py-2 px-4  sticky top-0 w-full">
        <h1 className="text-2xl font-extrabold ">Inicio</h1>
      </header>
      <section className="flex-1">
        {timeline?.map((note) => (
          <UserNote key={note.id} note={note} />
        ))}
      </section>
      <Navbar />
    </AppLayout>
  );
};

export default Home;
