import {
  Alert, Box, Button, Flex, PasswordInput, TextInput, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/slices/userSlice';
import { selectUser, selectUserError, selectUserLoading } from '../redux/store';

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = (values) => {
    dispatch(userLogin(values));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Flex align="center" justify="center" h="85%">
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%" maw={400}>
        <Flex direction="column" gap="sm">
          <Title order={3} c="dark.3" tt="uppercase">
            Sign in
          </Title>
          {error && (
            <Alert icon={<IconAlertCircle size="1rem" />} color="red" variant="outline">
              {error[Object.keys(error)[0]]}
            </Alert>
          )}
          <div>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              withAsterisk={false}
              required
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              withAsterisk={false}
              required
              {...form.getInputProps('password')}
            />
          </div>
          <Button fullWidth type="submit" loading={loading}>
            Sign in
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SigninForm;
