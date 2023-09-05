import {
  Avatar, Box, SimpleGrid, Text, Title,
} from '@mantine/core';
import PropTypes from 'prop-types';

const DoctorTable = ({ data }) => (
  <Box
    component="table"
    my="xl"
    sx={(theme) => ({
      fontWeight: 600,
      width: '100%',
      tr: {},
      td: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      },
      tbody: {
        'tr:nth-child(even)': {
          td: {
            backgroundColor: theme.colors.gray[0],
          },
        },
        'tr:nth-child(odd)': {
          td: {
            backgroundColor: theme.colors.gray[2],
          },
        },
      },
    })}
  >
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
  </Box>
);

const DoctorDetails = ({ data }) => (
  <SimpleGrid
    cols={2}
    breakpoints={[{ maxWidth: 'md', cols: 1 }]}
    spacing="xs"
    sx={{
      height: '100%',
      placeItems: 'center',
    }}
  >
    <div>
      <Avatar src={data.photo} alt={data.name} size={250} radius="50%" />
    </div>
    <div>
      <Title align="right">{data.name}</Title>
      <Text c="dark.3" align="right">
        {data.bio}
      </Text>
      <DoctorTable data={data} />
    </div>
  </SimpleGrid>
);

const DoctorDataProp = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    user: PropTypes.shape({
      phone_number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

DoctorDetails.propTypes = DoctorDataProp;
DoctorTable.propTypes = DoctorDataProp;

export default DoctorDetails;
