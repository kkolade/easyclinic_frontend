import {
  Box, Button, Center, Flex, Group, Text, Title,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDidUpdate } from '@mantine/hooks';
import { IconArrowRight, IconCalendarEvent, IconClock } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import camelToSnakeCase from 'utils/camelToSnakeCase';
import { createAppointment } from '../redux/slices/appointmentsSlice';
import { getClinics } from '../redux/slices/clinicsSlice';
import { getDoctors } from '../redux/slices/doctorsSlice';
import {
  selectAppointments,
  selectAppointmentsError,
  selectAppointmentsLoading,
  selectClinics,
  selectClinicsLoading,
  selectDoctors,
  selectDoctorsLoading,
} from '../redux/store';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';
import AppShellLoader from './AppShellLoader';
import CustomSelect from './CustomSelect';
import RouterLink from './RouterLink';

const AppointmentBookedAlert = () => (
  <AlertSuccess>
    Booking confirmed!
    {' '}
    <RouterLink to="/appointments">
      <Center inline>
        <Text mr={4}>See your appointments</Text>
        <IconArrowRight size="1rem" />
      </Center>
    </RouterLink>
  </AlertSuccess>
);

const BookAppointmentForm = () => {
  const dispatch = useDispatch();

  const appointments = useSelector(selectAppointments);
  const appointmentsLoading = useSelector(selectAppointmentsLoading);
  const appointmentsError = useSelector(selectAppointmentsError);
  const clinics = useSelector(selectClinics);
  const clinicsLoading = useSelector(selectClinicsLoading);
  const doctors = useSelector(selectDoctors);
  const doctorsLoading = useSelector(selectDoctorsLoading);

  const [appointmentsUpdated, setAppointmentsUpdated] = useState(false);

  const handleSubmit = (values) => {
    dispatch(createAppointment(camelToSnakeCase(values)));
  };

  useEffect(() => {
    dispatch(getClinics());
    dispatch(getDoctors());
  }, [dispatch]);

  useDidUpdate(() => {
    setAppointmentsUpdated(true);
  }, [appointments]);

  const form = useForm({
    initialValues: {
      doctorId: null,
      clinicId: null,
      reservationDate: new Date(),
      reservationTime: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
    },

    transformValues: (values) => {
      const { reservationDate } = values;
      const date = reservationDate.getDate();
      const month = reservationDate.getMonth() + 1;
      const year = reservationDate.getFullYear();

      return {
        ...values,
        reservationDate: `${year}-${month}-${date}`,
      };
    },
  });

  if (clinicsLoading || doctorsLoading) return <AppShellLoader />;

  return (
    <Flex direction="column" align="center" justify="center" rowGap="xl" h="100%">
      <Box sx={{ textAlign: 'center' }} mb="xl">
        <Title order={3} tt="uppercase">
          Book your appointment
        </Title>
        <Text fw="500">Ready to see a doctor? - start by filling out the booking form</Text>
      </Box>
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%" maw={600}>
        <Flex direction="column" gap="sm">
          {appointmentsError
            && appointmentsError.map((err) => <AlertError key={err.id}>{err.message}</AlertError>)}

          {appointmentsUpdated && <AppointmentBookedAlert />}

          <CustomSelect
            label="Select doctor"
            placeholder="Choose a Doctor"
            data={doctors.map(({
              id, name, photo, specialty,
            }) => ({
              key: id,
              label: name,
              description: specialty?.name ?? '',
              image: photo,
              value: id,
            }))}
            {...form.getInputProps('doctorId')}
          />
          <CustomSelect
            label="Select clinic"
            placeholder="Choose a Clinic"
            data={clinics.map(({
              id, name: doctorName, city, address,
            }) => ({
              key: id,
              label: doctorName,
              description: `${address}, ${city}`,
              value: id,
            }))}
            {...form.getInputProps('clinicId')}
          />
          <Group grow noWrap={false} spacing="xs">
            <DateInput
              description="Appointment Date"
              icon={<IconCalendarEvent />}
              maxDate={new Date()}
              withAsterisk={false}
              miw={250}
              maw="100%"
              required
              clearable
              {...form.getInputProps('reservationDate')}
            />
            <TimeInput
              description="Appointment Time"
              icon={<IconClock />}
              withAsterisk={false}
              miw={250}
              maw="100%"
              required
              {...form.getInputProps('reservationTime')}
            />
          </Group>
          <Button fullWidth type="submit" loading={appointmentsLoading}>
            Book appointment
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default BookAppointmentForm;
