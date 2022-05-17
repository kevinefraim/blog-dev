import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import FormNote from "components/FormNote";
import Navbar from "components/Navbar";
import useUser from "hooks/useUser";
import AppLayout from "components/AppLayout";
import { addNote } from "fb/client";

const FORM_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
};

const New = () => {
  const user = useUser();
  const [form, setForm] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [status, setStatus] = useState(FORM_STATES.USER_NOT_KNOWN);
  const isButtonDisabled = status === FORM_STATES.LOADING;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(FORM_STATES.LOADING);
    addNote({
      avatar: user.avatar,
      content: form,
      userId: user.uid,
      username: user.username,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => setErrors(err));
  };

  // useEffect(() => {
  //   if (isSubmitting) {
  //     if (Object.keys(errors).length === 0) {
  //       createNote();
  //     } else {
  //       setIsSubmitting(false);
  //     }
  //   }
  // }, [errors]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let errs = validate();
  //   setErrors(errs);
  //   setIsSubmitting(true);
  // };

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

  const createNote = async () => {
    try {
      await axios.post("http://localhost:3000/api/notes", form);
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
          Create notes
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
            isButtonDisabled={isButtonDisabled}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default New;
