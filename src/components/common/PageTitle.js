import { useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';

export function PageTitle({ title }) {
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const pageTitle = unreadCount > 0 ? `[${unreadCount}] ${title}` : title;
    document.title = pageTitle;
  }, [title, unreadCount]);

  return null;
}

