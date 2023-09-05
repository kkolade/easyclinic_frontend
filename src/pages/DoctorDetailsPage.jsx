import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AppShell from 'components/AppShell';
import AppShellLoader from 'components/AppShellLoader';
import DoctorDetails from 'components/DoctorDetails';
import { selectDoctorsError, selectSelectedDoctor } from '../redux/store';
import { getDoctorById } from '../redux/slices/doctorsSlice';

const DoctorDetailsPage = () => {
  useDocumentTitle('Doctor Details - EasyClinic');

  const dispatch = useDispatch();

  const { id } = useParams();
  const doctor = useSelector(selectSelectedDoctor);
  const error = useSelector(selectDoctorsError);

  useEffect(() => {
    dispatch(getDoctorById(id));
  }, [dispatch, id]);

  if (error) return <AppShell>{error}</AppShell>;

  if (!doctor) return <AppShellLoader />;

  return (
    <AppShell>
      <DoctorDetails data={doctor} />
    </AppShell>
  );
};

export default DoctorDetailsPage;
