import {
  IconArchiveOff,
  IconCalendar,
  IconCalendarPlus,
  IconHome,
  IconLogin,
  IconLogout,
  IconPlus,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { userSignout } from '../redux/slices/userSlice';
import { selectUser } from '../redux/store';
import NavigationButton from './NavigationButton';
import NavigationLink from './NavigationLink';

const navigationLinks = [{ icon: <IconHome />, label: 'Home', path: '/' }];
const signedInLinks = [
  { icon: <IconCalendarPlus />, label: 'Book appointment', path: '/book-appointment' },
  { icon: <IconCalendar />, label: 'My appointments', path: '/appointments' },
];
const signedOutLinks = [{ icon: <IconLogin />, label: 'Sign in', path: '/signin' }];
const adminLinks = [
  { icon: <IconPlus />, label: 'Add doctor', path: '/add-doctor' },
  { icon: <IconArchiveOff />, label: 'Delete doctors', path: '/delete-doctors' },
];

const MainLinks = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const renderLinks = () => {
    if (!user) return navigationLinks.concat(signedOutLinks);

    let links = navigationLinks.concat(signedInLinks);
    if (user.role === 'admin') {
      links = links.concat(adminLinks);
    }
    return links;
  };

  const links = renderLinks().map(({ label, icon, path }) => {
    const isActive = location.pathname === path;
    return <NavigationLink key={label} label={label} icon={icon} path={path} active={isActive} />;
  });

  return (
    <div>
      {links}
      {user && (
        <NavigationButton
          icon={<IconLogout />}
          label="Sign out"
          onClick={() => dispatch(userSignout())}
        />
      )}
    </div>
  );
};

export default MainLinks;
