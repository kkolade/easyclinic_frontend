import {
  Avatar, Badge, Group, ScrollArea, Table, Text,
} from '@mantine/core';
import PropTypes from 'prop-types';

export function AppointmentsList({ data }) {
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
          {doctor.experience}
          + years
        </Badge>
      </td>
      <td>
        <Text c="dimmed">{doctor.clinic}</Text>
      </td>
      <td>
        <Text c="dimmed">{doctor.location}</Text>
      </td>
      <td>
        <Text c="dimmed">{doctor.date}</Text>
      </td>
      <td>
        <Text c="dimmed">{doctor.time}</Text>
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
            <th>Experience</th>
            <th>Clinic</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

AppointmentsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      experience: PropTypes.number.isRequired,
      clinic: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AppointmentsList;
