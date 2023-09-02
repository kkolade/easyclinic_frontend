import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';
import SignupForm from 'components/SignupForm';

const SignupPage = () => {
  useDocumentTitle('Sign up | EasyClinic');

  return (
    <AppShell>
      <SignupForm />
    </AppShell>
  );
};

export default SignupPage;
