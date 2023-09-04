import { Flex, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppShell from 'components/AppShell';
import AppShellLoader from 'components/AppShellLoader';
import DoctorsList from 'components/DoctorsList';
import { getDoctors } from '../redux/slices/doctorsSlice';
import { selectAppointmentsLoading, selectDoctors } from '../redux/store';

const DeleteDoctorsPage = () => {
  useDocumentTitle('Delete Doctors - EasyClinic');

  const dispatch = useDispatch();

  const doctors = useSelector(selectDoctors);
  const loading = useSelector(selectAppointmentsLoading);

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  // Use useMemo to memoize the transformed doctors
  const transformedDoctors = useMemo(
    () => doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      avatar: doctor.photo,
      specialty: doctor.specialty?.name,
      email: doctor.user.email,
      phone: doctor.user.phone_number,
    })),
    [doctors],
  );

  if (loading) return <AppShellLoader />;

  return (
    <AppShell>
      <Flex direction="column" align="center">
        <Title order={3} tt="uppercase" my="xl" align="center">
          All doctors
        </Title>
        <DoctorsList data={transformedDoctors} />
      </Flex>
    </AppShell>
  );
};

export default DeleteDoctorsPage;
