import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';
import AppointmentForm from 'components/AppointmentForm';

const BookAppointmentPage = () => {
  useDocumentTitle('Book Appointment - EasyClinic');

  return (
    <AppShell>
      <AppointmentForm />
    </AppShell>
  );
};

export default BookAppointmentPage;
