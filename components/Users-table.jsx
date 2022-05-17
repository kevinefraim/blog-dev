import React from "react";
import { Table } from "semantic-ui-react";

const UsersTable = ({ users }) => {
  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Apellido</Table.HeaderCell>
          <Table.HeaderCell>Edad</Table.HeaderCell>
          <Table.HeaderCell>Premium Plan</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user, idx) => (
          <Table.Row key={idx}>
            <Table.Cell>{user.nombre}</Table.Cell>
            <Table.Cell>{user.apellido}</Table.Cell>
            <Table.Cell>{user.edad}</Table.Cell>
            <Table.Cell>{user.premium ? "Si" : "No"}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UsersTable;
