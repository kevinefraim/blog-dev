import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Button, Confirm, Loader } from "semantic-ui-react";
import AppLayout from "components/AppLayout";
import Navbar from "components/Navbar";

const Note = ({ data }) => {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteNote = async () => {
    try {
      const noteId = router.query.id;
      await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    close();
  };

  return (
    <AppLayout>
      <Navbar />
      <div>
        {isDeleting ? (
          <Loader active />
        ) : (
          <div className="flex flex-col  justify-center items-center mt-20">
            <div className="w-[30%] gap-8 bg-white shadow-2xl rounded p-4 flex flex-col items-center">
              <h1 className="text-center text-blue-600 text-3xl">
                {data?.title}
              </h1>
              <p className="text-2xl">{data?.description}</p>
              <Button onClick={open} color="red">
                Delete
              </Button>
            </div>
          </div>
        )}
        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = async ({ query: { id } }) => {
  const { data } = await axios.get(`http://localhost:3000/api/notes/${id}`);
  console.log(id);
  return { props: data };
};

export default Note;
