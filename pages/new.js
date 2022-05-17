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
  const [message, setMessage] = useState("");
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
      content: message,
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
    setMessage(e.target.value);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let errs = validate();
  //   setErrors(errs);
  //   setIsSubmitting(true);
  // };

  return (
    <AppLayout>
      <Navbar />
      <div className="flex justify-center my-10">
        <h1 className="text-blue-600 font-extrabold text-6xl px-8 py-4 bg-white shadow-2xl rounded-full">
          Create a Message
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
            message={message}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default New;
