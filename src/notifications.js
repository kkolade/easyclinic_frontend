import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

const showNotification = ({ type, title, message }) => {
  let color;
  let icon;
  let notificationTitle = title;

  if (!message) return;

  if (type && notificationTitle === undefined) {
    notificationTitle = type.charAt(0).toUpperCase() + type.slice(1);
  }

  if (type === 'success') {
    color = 'teal';
    icon = React.createElement(IconCheck, { size: '1.1rem' });
  } else if (type === 'error') {
    color = 'red';
    icon = React.createElement(IconX, { size: '1.1rem' });
  }

  notifications.show({
    icon, color, title: notificationTitle, message,
  });
};

export default showNotification;
