import {
  Alert,
  Box,
  Button,
  Center,
  Flex,
  Group,
  PasswordInput,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconChevronLeft } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import RouterLink from 'components/RouterLink';
import { userSignup } from '../redux/slices/userSlice';
import { selectUserError, selectUserLoading } from '../redux/store';

const SignupForm = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      birthdate: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },

    transformValues: (values) => {
      const { birthdate } = values;
      return {
        ...values,
        birthdate: `${birthdate.getDate()}-${birthdate.getMonth() + 1}-${birthdate.getFullYear()}`,
      };
    },
  });

  const handleSubmit = (values) => {
    dispatch(userSignup(values));
  };

  return (
    <Flex align="center" justify="center" h="100%">
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%" maw={600}>
        <Flex direction="column" gap="sm">
          <Title order={3} c="dark.3" tt="uppercase" mb="sm">
            Sign up
          </Title>
          {error
            && error.map(({ id, message }) => (
              <Alert key={id} icon={<IconAlertCircle size="1rem" />} color="red" variant="outline">
                {message}
              </Alert>
            ))}
          <Group grow noWrap={false} spacing="xs">
            <TextInput
              label="First Name"
              placeholder="Your first name"
              required
              {...form.getInputProps('firstName')}
              miw={250}
              maw="100%"
            />
            <TextInput
              label="Last Name"
              placeholder="Your last name"
              required
              {...form.getInputProps('lastName')}
              miw={250}
              maw="100%"
            />
          </Group>
          <TextInput
            label="Email"
            placeholder="Your email address"
            required
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Username"
            placeholder="Desired username"
            required
            {...form.getInputProps('username')}
          />
          <Group grow noWrap={false} spacing="xs">
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
              miw={250}
              maw="100%"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              {...form.getInputProps('confirmPassword')}
              miw={250}
              maw="100%"
            />
          </Group>
          <TextInput
            label="Phone"
            placeholder="Your phone number"
            required
            {...form.getInputProps('phoneNumber')}
          />
          <DateInput
            label="Birth Date"
            placeholder="Your birth date"
            maxDate={new Date()}
            required
            clearable
            {...form.getInputProps('birthdate')}
          />
          <Button fullWidth type="submit" loading={loading}>
            Sign up
          </Button>
          <RouterLink to={-1} mt="md">
            <Center inline>
              <IconChevronLeft size={rem(20)} />
              Go back
            </Center>
          </RouterLink>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignupForm;
