import classNames from "classnames";
import React from "react";
import { Button, Form } from "semantic-ui-react";

const FormNote = ({
  handleSubmit,
  handleChange,
  errors,
  message,
  isButtonDisabled,
  handleDragEnter,
  handleDragLeave,
  handleDragDrop,
  drag,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className=" w-[80%] h-[40%] text-white p-4 flex flex-col "
    >
      <textarea
        label="Add a Message"
        placeholder="Message"
        name="description"
        onChange={handleChange}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        error={
          errors.description
            ? { content: "Please enter a description", pointing: "below" }
            : null
        }
        value={message}
        className={`bg-gray-100 rounded p-2 text-black h-full`}
      />
      <button
        className="bg-gray-500 mt-4 rounded w-1/4"
        disabled={isButtonDisabled}
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default FormNote;
