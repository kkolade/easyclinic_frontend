import { Avatar, Box, Button, Flex, Group, Loader, Select, Text, Title } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendarEvent, IconClock } from '@tabler/icons-react';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppShell from 'components/AppShell';
import { getClinics } from '../redux/slices/clinicsSlice';
import { getDoctors } from '../redux/slices/doctorsSlice';
import {
  selectClinics,
  selectClinicsLoading,
  selectDoctors,
  selectDoctorsLoading,
} from '../redux/store';

const SelectItem = forwardRef(({ image, label, description, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      {image && <Avatar radius="50%" src={image} />}
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

const BookAppointmentPage = () => {
  const dispatch = useDispatch();

  const clinics = useSelector(selectClinics);
  const clinicsLoading = useSelector(selectClinicsLoading);

  const doctors = useSelector(selectDoctors);
  const doctorsLoading = useSelector(selectDoctorsLoading);

  const form = useForm({
    initialValues: {
      doctor: '', // may need to change
      clinic: '', // may need to change
      date: new Date(),
      time: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    dispatch(getClinics());
    dispatch(getDoctors());
  }, []);

  if (clinicsLoading || doctorsLoading)
    return (
      <AppShell>
        <Flex align="center" justify="center" h="100%">
          <Loader />
        </Flex>
      </AppShell>
    );

  return (
    <AppShell>
      <Flex direction="column" align="center" justify="center" rowGap="xl" h="100%">
        <Box sx={{ textAlign: 'center' }} mb="xl">
          <Title order={3} tt="uppercase">
            Book your appointment
          </Title>
          <Text fw="500">Ready to see a doctor? - start by filling out the booking form</Text>
        </Box>
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%" maw={600}>
          <Flex direction="column" gap="sm">
            <Select
              label="Select doctor"
              placeholder="Choose a Doctor"
              itemComponent={SelectItem}
              data={doctors.map(({ id, name, photo, specialty }) => ({
                key: id,
                label: name,
                description: specialty?.name ?? '',
                image: photo,
                value: name,
              }))}
              withAsterisk={false}
              required
              searchable
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description.toLowerCase().includes(value.toLowerCase().trim())
              }
              {...form.getInputProps('doctor')}
            />
            <Select
              label="Select clinic"
              placeholder="Choose a Clinic"
              itemComponent={SelectItem}
              data={clinics.map(({ id, name: doctorName, city, address }) => ({
                key: id,
                label: doctorName,
                description: `${city}, ${address}`,
                image: null,
                value: doctorName,
              }))}
              withAsterisk={false}
              required
              searchable
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description.toLowerCase().includes(value.toLowerCase().trim())
              }
              {...form.getInputProps('clinic')}
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
                {...form.getInputProps('date')}
              />
              <TimeInput
                description="Appointment Time"
                icon={<IconClock />}
                withAsterisk={false}
                miw={250}
                maw="100%"
                required
                {...form.getInputProps('time')}
              />
            </Group>
            <Button fullWidth type="submit" loading={false}>
              Book appointment
            </Button>
          </Flex>
        </Box>
      </Flex>
    </AppShell>
  );
};

export default BookAppointmentPage;
