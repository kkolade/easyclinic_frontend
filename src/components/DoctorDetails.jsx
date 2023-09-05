import {
  Avatar,
  Badge,
  Box,
  Center,
  SimpleGrid,
  Space,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { IconCalendarCheck, IconChevronRight } from '@tabler/icons-react';
import PropTypes from 'prop-types';

import RouterButton from './RouterButton';
import RouterLink from './RouterLink';

const useStyles = createStyles((theme) => ({
  table: {
    fontWeight: 600,
    width: '100%',
    margin: `${theme.spacing.xs} auto`,
    td: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    },
    tbody: {
      'tr:nth-of-type(even)': {
        td: {
          backgroundColor: theme.colors.gray[0],
        },
      },
      'tr:nth-of-type(odd)': {
        td: {
          backgroundColor: theme.colors.gray[2],
        },
      },
    },
  },
}));

const DoctorTable = ({ data }) => {
  const { classes } = useStyles();

  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td>
            Name
            <span>{data.name}</span>
          </td>
        </tr>
        <tr>
          <td>
            Phone
            {' '}
            <span>{data.user.phone_number}</span>
          </td>
        </tr>
        <tr>
          <td>
            Email
            {' '}
            <span>{data.user.email}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const DoctorDetails = ({ data }) => (
  <SimpleGrid
    cols={2}
    breakpoints={[{ maxWidth: 'md', cols: 1 }]}
    spacing="xs"
    sx={{ height: '100%', placeItems: 'center' }}
  >
    <div>
      <Avatar src={data.photo} alt={data.name} size={300} radius="50%" />
    </div>
    <Box sx={{ textAlign: 'right' }}>
      <div>
        <Title>{data.name}</Title>
        <Badge>{data.specialty?.name || 'General Practitioner'}</Badge>
      </div>

      <div>
        <Space h="sm" />
        <Text c="dark.3">{data.bio}</Text>
        <DoctorTable data={data} />
      </div>

      <div>
        <Space h="sm" />
        <RouterButton to={`/book-appointment?doctorId=${data.id}`} radius="xl" size="md">
          <Center inline>
            <IconCalendarCheck />
            <Text ml={rem(4)}>Book now</Text>
          </Center>
        </RouterButton>
      </div>

      <div>
        <Space h="xl" />
        <RouterLink to="/">
          <Center
            inline
            sx={(theme) => ({
              color: theme.colors.blue[8],
            })}
          >
            Find more doctors
            <Box component={IconChevronRight} size={rem(20)} />
          </Center>
        </RouterLink>
      </div>
    </Box>
  </SimpleGrid>
);

const DoctorDataProp = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    specialty: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    user: PropTypes.shape({
      phone_number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

DoctorDetails.propTypes = DoctorDataProp;
DoctorTable.propTypes = DoctorDataProp;

export default DoctorDetails;
