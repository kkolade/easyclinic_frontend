import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AppShell from 'components/AppShell';
import AppShellLoader from 'components/AppShellLoader';
import DoctorDetails from 'components/DoctorDetails';
import { clearSelectedDoctor, getDoctorById } from '../redux/slices/doctorsSlice';
import { selectDoctorsError, selectSelectedDoctor } from '../redux/store';

const DoctorDetailsPage = () => {
  useDocumentTitle('Doctor Details - EasyClinic');

  const dispatch = useDispatch();

  const { id } = useParams();
  const doctor = useSelector(selectSelectedDoctor);
  const error = useSelector(selectDoctorsError);

  useEffect(() => {
    dispatch(getDoctorById(id));
    // clear selected doctor on unmount
    return () => dispatch(clearSelectedDoctor());
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
