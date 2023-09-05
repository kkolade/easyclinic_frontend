import {
  Avatar, SimpleGrid, Text, Title, createStyles,
} from '@mantine/core';
import PropTypes from 'prop-types';

const useStyles = createStyles((theme) => ({
  table: {
    fontWeight: 600,
    width: '100%',
    margin: `${theme.spacing.xl} auto`,
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
