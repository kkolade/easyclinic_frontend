import { useDocumentTitle } from '@mantine/hooks';

import AppShell from 'components/AppShell';
import SigninForm from 'components/SigninForm';

const SigninPage = () => {
  useDocumentTitle('Sign in - EasyClinic');

  return (
    <AppShell>
      <SigninForm />
    </AppShell>
  );
};

export default SigninPage;
