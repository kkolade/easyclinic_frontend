import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';
import BookAppointmentForm from 'components/BookAppointmentForm';

const BookAppointmentPage = () => {
  useDocumentTitle('Book Appointment - EasyClinic');

  return (
    <AppShell>
      <BookAppointmentForm />
    </AppShell>
  );
};

export default BookAppointmentPage;
