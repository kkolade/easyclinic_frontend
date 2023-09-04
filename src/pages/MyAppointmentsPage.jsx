import { Flex, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';
import AppointmentsList from 'components/AppointmentsList';

const MyAppointmentsPage = () => {
  useDocumentTitle('My Appointments - EasyClinic');

  return (
    <AppShell>
      <Flex direction="column" align="center" h="100%">
        <Title order={3} mb="xl" align="center">
          My Appointments
        </Title>
        <AppointmentsList data={[]} />
      </Flex>
    </AppShell>
  );
};

export default MyAppointmentsPage;
