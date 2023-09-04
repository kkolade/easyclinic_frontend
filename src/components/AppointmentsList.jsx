import { Avatar, Badge, Group, ScrollArea, Table, Text } from '@mantine/core';

export function AppointmentsList({ data }) {
  const rows = data.map((doctor) => (
    <tr key={doctor.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={doctor.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {doctor.name}
          </Text>
        </Group>
      </td>
      <td>
        <Badge color="cyan" variant="outline">
          {doctor.specialty}
        </Badge>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {doctor.clinic}
        </Text>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {doctor.reservation_date}
        </Text>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {doctor.reservation_time}
        </Text>
      </td>
    </tr>
  ));

  if (!data.length) return null;

  return (
    <ScrollArea>
      <Table withBorder>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialty</th>
            <th>Clinic</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default AppointmentsList;
