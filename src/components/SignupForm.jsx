import {
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
import { IconChevronLeft } from '@tabler/icons-react';

import RouterLink from 'components/RouterLink';

const SignupForm = () => {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      birthDate: '',
    },
  });

  return (
    <Flex align="center" justify="center" h="85%">
      <Box
        component="form"
        onSubmit={form.onSubmit((values) => console.log(values))}
        w="100%"
        maw={600}
      >
        <Flex direction="column" gap="sm">
          <Title order={3} c="dark.3" tt="uppercase">
            Sign up
          </Title>
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
            {...form.getInputProps('phone')}
          />
          <DateInput
            label="Birth Date"
            placeholder="Your birth date"
            required
            clearable
            {...form.getInputProps('birthDate')}
          />
          <Button fullWidth type="submit" loading>
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
