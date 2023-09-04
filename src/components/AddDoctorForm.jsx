import {
  Box, Button, Flex, NumberInput, TextInput, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDidUpdate } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import camelToSnakeCase from 'utils/camelToSnakeCase';
import { createDoctor } from '../redux/slices/doctorsSlice';
import { selectDoctors, selectDoctorsError, selectDoctorsLoading } from '../redux/store';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';

const AddDoctorForm = () => {
  const dispatch = useDispatch();

  const doctors = useSelector(selectDoctors);
  const loading = useSelector(selectDoctorsLoading);
  const error = useSelector(selectDoctorsError);

  const [doctorsUpdated, setDoctorsUpdated] = useState(false);

  const handleSubmit = (values) => {
    dispatch(createDoctor(camelToSnakeCase(values)));
  };

  const form = useForm({
    initialValues: {
      name: '',
      photo: '',
      experienceYears: 5,
      bio: '',
    },
  });

  useDidUpdate(() => {
    setDoctorsUpdated(true);
  }, [doctors]);

  return (
    <Flex direction="column" align="center" justify="center" rowGap="xl" h="100%">
      <Box sx={{ textAlign: 'center' }} mb="xl">
        <Title order={3} tt="uppercase">
          Create a doctor
        </Title>
      </Box>
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%" maw={600}>
        <Flex direction="column" gap="sm">
          {error && error.map((err) => <AlertError key={err.id}>{err.message}</AlertError>)}

          {doctorsUpdated && <AlertSuccess>Doctor created successfully!</AlertSuccess>}

          <TextInput
            label="Doctor name"
            placeholder="Enter doctor name"
            withAsterisk={false}
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Profile photo"
            placeholder="Enter image URL"
            withAsterisk={false}
            required
            {...form.getInputProps('photo')}
          />
          <NumberInput
            defaultValue={18}
            label="Experience (years)"
            withAsterisk={false}
            required
            {...form.getInputProps('experienceYears')}
          />
          <TextInput
            label="Bio"
            placeholder="Share your professional background, interests, and accomplishments."
            withAsterisk={false}
            required
            {...form.getInputProps('bio')}
            styles={{
              input: {
                height: 80,
              },
            }}
          />
          <Button fullWidth type="submit" loading={loading}>
            Add doctor
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AddDoctorForm;
