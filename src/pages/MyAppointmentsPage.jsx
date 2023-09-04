import { Flex, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppShell from 'components/AppShell';
import AppShellLoader from 'components/AppShellLoader';
import AppointmentsList from 'components/AppointmentsList';
import { getAppointments } from '../redux/slices/appointmentsSlice';
import { selectAppointments, selectAppointmentsLoading } from '../redux/store';

const MyAppointmentsPage = () => {
  useDocumentTitle('My Appointments - EasyClinic');

  const dispatch = useDispatch();

  const appointments = useSelector(selectAppointments);
  const loading = useSelector(selectAppointmentsLoading);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  // Use useMemo to memoize the transformed appointments
  const transformedAppointments = useMemo(() => appointments.map((appointment) => ({
    id: appointment.id,
    avatar: appointment.doctor.photo,
    experience: appointment.doctor.experience_years,
    clinic: appointment.clinic.name,
    location: `${appointment.clinic.address}, ${appointment.clinic.city}`,
    date: appointment.reservation_date,
    time: new Date(appointment.reservation_time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }),
  })), [appointments]);

  if (loading) return <AppShellLoader />;

  return (
    <AppShell>
      <Flex direction="column" align="center">
        <Title order={3} tt="uppercase" mb="xl" align="center">
          Appointments History
        </Title>
        <AppointmentsList data={transformedAppointments} />
      </Flex>
    </AppShell>
  );
};

export default MyAppointmentsPage;
