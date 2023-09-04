import { Carousel } from '@mantine/carousel';
import {
  Avatar, Box, Flex, Loader, Text, Title,
} from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppShell from 'components/AppShell';
import RouterLink from 'components/RouterLink';
import { getDoctors } from '../redux/slices/doctorsSlice';
import { selectDoctors, selectDoctorsLoading } from '../redux/store';

const HomePage = () => {
  useDocumentTitle('EasyClinic');

  const dispatch = useDispatch();

  const doctors = useSelector(selectDoctors);
  const loading = useSelector(selectDoctorsLoading);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  if (loading) {
    return (
      <AppShell>
        <Flex align="center" justify="center" h="100%">
          <Loader />
        </Flex>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Flex direction="column" align="center" justify="center" rowGap="xl" h="100%">
        <Box sx={{ textAlign: 'center' }} mb="xl">
          <Title>Your Health, Our Priority</Title>
          <Text fw="500">Book your appointment today!</Text>
        </Box>
        {doctors.length > 0 && (
          <Carousel
            slideSize="33.333333%"
            breakpoints={[
              { maxWidth: 'sm', slideSize: '100%' },
              { maxWidth: 'md', slideSize: '50%' },
            ]}
            slideGap="xs"
            align="start"
            slidesToScroll={1}
            controlsOffset="sm"
            controlSize={40}
            maw="100%"
            loop
            styles={(theme) => ({
              control: {
                backgroundColor: theme.colors.blue[2],
              },
            })}
          >
            {doctors.map((doctor) => (
              <Carousel.Slide key={doctor.id}>
                <Flex direction="column">
                  <RouterLink
                    to={`/doctors/${doctor.id}`}
                    c="dark.3"
                    sx={{
                      '&:hover': {
                        textDecoration: 'none',
                      },
                    }}
                  >
                    <Avatar
                      src={doctor.photo}
                      alt={doctor.name}
                      radius="50%"
                      size={200}
                      mb="md"
                      mx="auto"
                    />
                    <Title align="center" order={3}>
                      {doctor.name}
                    </Title>
                  </RouterLink>
                  <Text c="gray.6" align="center">
                    {doctor.bio}
                  </Text>
                </Flex>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Flex>
    </AppShell>
  );
};

export default HomePage;
