import {
  Button,
  Center,
  Container,
  Flex,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Container fluid>
    <Center h="100vh">
      <Flex direction="column" justify="center" align="center" rowGap="sm">
        <Title order={2}>Not Found (404)</Title>
        <Text c="dimmed" fz={rem(17)}>
          Sorry, the page you are looking for does not exist.
        </Text>
        <Button component={Link} to="/" sx={{ marginTop: rem(16) }}>
          <IconChevronLeft size={rem(20)} />
          <Text fz={rem(15)} sx={{ marginLeft: rem(8) }}>
            Back to home
          </Text>
        </Button>
      </Flex>
    </Center>
  </Container>
);

export default NotFoundPage;
