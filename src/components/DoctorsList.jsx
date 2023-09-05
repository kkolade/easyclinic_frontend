import {
  ActionIcon, Anchor, Avatar, Badge, Group, ScrollArea, Table, Text,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteDoctor } from '../redux/slices/doctorsSlice';

export const DoctorsList = ({ data }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id));
  };

  const rows = data.map((doctor) => (
    <tr key={doctor.id}>
      <td>
        <Group spacing="sm">
          <Avatar src={doctor.avatar} radius="50%" />
          <Text fw={500}>{doctor.name}</Text>
        </Group>
      </td>
      <td>
        <Badge color="indigo.3" variant="outline">
          {doctor.specialty || 'General Medicine'}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {doctor.email}
        </Anchor>
      </td>
      <td>
        <Text c="dimmed">{doctor.phone}</Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => handleDelete(doctor.id)}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  if (!data.length) return null;

  return (
    <ScrollArea maw="100%">
      <Table verticalSpacing="md" fontSize="md" sx={{ minWidth: 800 }}>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialty</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

DoctorsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      specialty: PropTypes.string,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default DoctorsList;
