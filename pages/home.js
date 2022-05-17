import AppLayout from "components/AppLayout";
import UserNote from "components/UserNote";
import { fetchLatestNotes } from "fb/client";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();
  useEffect(() => {
    user && fetchLatestNotes().then(setTimeline);
  }, [user]);
  console.log(timeline);
  return (
    <AppLayout>
      <section className="grid place-items-center place-content-center h-full w-full">
        <div className="flex flex-col p-4 bg-white shadow-2xl w-[380px] h-[600px] rounded ">
          {timeline?.map((note) => (
            <UserNote key={note.id} note={note} />
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;
