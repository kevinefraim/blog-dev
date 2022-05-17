import classNames from "classnames";
import { DRAG_IMAGE_STATES } from "pages/new";
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
        className={`bg-gray-100 border-[1px]  border-gray-400 rounded p-2 text-black h-full ${
          drag === DRAG_IMAGE_STATES.DRAG_OVER && "border-dashed border-[3px]"
        }`}
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
