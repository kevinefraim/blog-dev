import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import AppLayout from "components/AppLayout";
import FormNote from "components/FormNote";
import Navbar from "components/Navbar";

const Edit = ({ data }) => {
  const [form, setForm] = useState({
    title: data?.title,
    description: data?.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        editNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };

  const editNote = async () => {
    const noteId = router.query.id;
    try {
      await axios.put(`http://localhost:3000/api/notes/${noteId}`, form);
      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <Navbar />
      <div className="flex justify-center my-10">
        <h1 className="text-blue-600 font-extrabold text-6xl px-8 py-4 bg-white shadow-2xl rounded-full">
          Edit Note
        </h1>
      </div>
      <div className="flex justify-center ">
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <FormNote
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            errors={errors}
            form={form}
          />
        )}
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = async ({ query: { id } }) => {
  const { data } = await axios.get(`http://localhost:3000/api/notes/${id}`);
  return { props: data };
};

export default Edit;
