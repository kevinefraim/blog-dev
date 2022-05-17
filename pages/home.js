import AppLayout from "components/AppLayout";
import UserNote from "components/UserNote";
import { fetchLatestNotes } from "fb/client";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import CreateIcon from "components/svg/create-icon";
import Link from "next/link";

const Home = () => {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();
  useEffect(() => {
    user && fetchLatestNotes().then(setTimeline);
  }, [user]);
  console.log(timeline);
  return (
    <AppLayout>
      <div className="h-[40px] border-b-[1px] mb-4 py-2 px-4 flex items-center justify-between sticky top-0 w-full">
        <h1 className="text-2xl font-extrabold ">Inicio</h1>
        <Link href="/new">
          <a>
            <CreateIcon width={32} height={32} stroke="#000" />
          </a>
        </Link>
      </div>
      <section className="flex-1">
        {timeline?.map((note) => (
          <UserNote key={note.id} note={note} />
        ))}
      </section>
    </AppLayout>
  );
};

export default Home;
