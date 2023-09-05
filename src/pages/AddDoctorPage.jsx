import { useDocumentTitle } from '@mantine/hooks';

import AddDoctorForm from 'components/AddDoctorForm';
import AppShell from 'components/AppShell';

const AddDoctorPage = () => {
  useDocumentTitle('Add Doctor - EasyClinic');

  return (
    <AppShell>
      <AddDoctorForm />
    </AppShell>
  );
};

export default AddDoctorPage;
