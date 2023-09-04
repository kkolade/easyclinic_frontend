import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';

const DoctorDetailsPage = () => {
  useDocumentTitle('Doctor Details - EasyClinic');

  return <AppShell>DoctorDetailsPage</AppShell>;
};

export default DoctorDetailsPage;
