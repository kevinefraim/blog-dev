import React from "react";
import { Button, Form } from "semantic-ui-react";

const FormNote = ({
  handleSubmit,
  handleChange,
  errors,
  message,
  isButtonDisabled,
}) => {
  return (
    <Form onSubmit={handleSubmit} className=" w-[40%] text-white p-4 ">
      <Form.TextArea
        label="Add a Message"
        placeholder="Message"
        name="description"
        onChange={handleChange}
        error={
          errors.description
            ? { content: "Please enter a description", pointing: "below" }
            : null
        }
        value={message}
      />
      <Button disabled={isButtonDisabled} type="submit">
        Save
      </Button>
    </Form>
  );
};

export default FormNote;
