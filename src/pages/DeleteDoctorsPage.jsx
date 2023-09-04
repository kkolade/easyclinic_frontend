import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';
import DoctorsList from 'components/DoctorsList';

const DeleteDoctorsPage = () => {
  useDocumentTitle('Delete Doctors - EasyClinic');

  return (
    <AppShell>
      <DoctorsList />
    </AppShell>
  );
};

export default DeleteDoctorsPage;
