import { useSyncExternalStore } from 'react';

const personalAccessKey = 'portfolio:personal-unlocked';
const personalAccessEvent = 'portfolio:personal-access-change';

const isPersonalRoute = () =>
  typeof window !== 'undefined' &&
  window.location.hash.replace(/^#/, '').split('?')[0] === '/personal';

const hasPersonalAccess = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.sessionStorage.getItem(personalAccessKey) === 'true';
  } catch {
    return false;
  }
};

const getSnapshot = () => hasPersonalAccess() || isPersonalRoute();
const getServerSnapshot = () => false;

const subscribe = (onStoreChange) => {
  window.addEventListener(personalAccessEvent, onStoreChange);
  window.addEventListener('hashchange', onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return () => {
    window.removeEventListener(personalAccessEvent, onStoreChange);
    window.removeEventListener('hashchange', onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
};

export const unlockPersonalAccess = () => {
  try {
    window.sessionStorage.setItem(personalAccessKey, 'true');
  } catch {
    // Navigation still works when storage is unavailable.
  }

  window.dispatchEvent(new Event(personalAccessEvent));
};

const usePersonalAccess = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default usePersonalAccess;
