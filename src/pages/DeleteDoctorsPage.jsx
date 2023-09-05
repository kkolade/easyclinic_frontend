import { Flex, Title } from '@mantine/core';
import { useDidUpdate, useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppShell from 'components/AppShell';
import AppShellLoader from 'components/AppShellLoader';
import DoctorsList from 'components/DoctorsList';
import showNotification from '../notifications';
import { getDoctors } from '../redux/slices/doctorsSlice';
import { selectAppointmentsLoading, selectDoctors, selectDoctorsError } from '../redux/store';

const DeleteDoctorsPage = () => {
  useDocumentTitle('Delete Doctors - EasyClinic');

  const dispatch = useDispatch();

  const doctors = useSelector(selectDoctors);
  const loading = useSelector(selectAppointmentsLoading);
  const error = useSelector(selectDoctorsError);

  useDidUpdate(() => {
    showNotification({ type: 'success', message: 'Doctor deleted successfully' });
  }, [doctors.length]);

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  if (error) return showNotification({ type: 'error', message: error });

  if (!doctors && loading) return <AppShellLoader />;

  return (
    <AppShell>
      <Flex direction="column" align="center">
        <Title order={3} tt="uppercase" my="xl" align="center">
          All doctors
        </Title>
        <DoctorsList
          data={doctors.map((doctor) => ({
            id: doctor.id,
            name: doctor.name,
            avatar: doctor.photo,
            specialty: doctor.specialty?.name,
            email: doctor.user.email,
            phone: doctor.user.phone_number,
          }))}
        />
      </Flex>
    </AppShell>
  );
};

export default DeleteDoctorsPage;
