import Link from "next/link";
import React from "react";
import { Button, Card } from "semantic-ui-react";

const NoteCard = ({ note }) => {
  return (
    <Card style={{ margin: "0" }}>
      <Card.Content>
        <Card.Header>
          <Link href={`/notes/${note?._id}`}>
            <a>{note.title}</a>
          </Link>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Link href={`/notes/${note?._id}`}>
          <Button primary>View</Button>
        </Link>
        <Link href={`/notes/${note?._id}/edit`}>
          <Button primary>Edit</Button>
        </Link>
      </Card.Content>
    </Card>
  );
};

export default NoteCard;
