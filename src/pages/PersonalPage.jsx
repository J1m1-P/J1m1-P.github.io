import { useEffect } from 'react';
import { unlockPersonalAccess } from '../hooks/usePersonalAccess.js';

const PersonalPage = () => {
  useEffect(() => {
    unlockPersonalAccess();
  }, []);

  return (
    <section className='standard-page padding-x-lg'>
      <header className='page-heading'>
        <p className='eyebrow'>Personal</p>
        <h1>Off the Clock</h1>
        <p>Life outside of engineering.</p>
      </header>
    </section>
  );
};

export default PersonalPage;
