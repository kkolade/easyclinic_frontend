import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';

const MyAppointmentsPage = () => {
  useDocumentTitle('My Appointments - EasyClinic');

  return <AppShell>MyAppointmentsPage</AppShell>;
};

export default MyAppointmentsPage;
