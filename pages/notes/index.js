import axios from "axios";
import Link from "next/link";
import React from "react";
import AppLayout from "components/AppLayout";
import Navbar from "components/Navbar";
import NoteCard from "components/NoteCard";

const Notes = ({ data }) => {
  console.log(data.data);
  return (
    <AppLayout>
      <Navbar />
      <div className="flex justify-center mt-10">
        <h1 className="text-blue-600 font-extrabold text-6xl px-8 py-4 bg-white shadow-2xl rounded-full">
          Notes
        </h1>
      </div>
      {data?.data.length === 0 ? (
        <h2 className="text-center text-red-500 mt-10 font-extrabold text-5xl">
          No hay notas guardadas,{" "}
          <Link href="/new">
            <a className="text-blue-500 underline hover:underline hover:text-gray-300">
              agregue una nueva
            </a>
          </Link>
        </h2>
      ) : (
        <div className="grid grid-cols-5 mt-10 ml-10 gap-4">
          {data?.data.map((note) => {
            return <NoteCard key={note._id} note={note} />;
          })}
        </div>
      )}
    </AppLayout>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/notes");

  return { props: { data } };
};

export default Notes;
