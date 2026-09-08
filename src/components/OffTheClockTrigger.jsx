import { useNavigate } from 'react-router-dom';
import { unlockPersonalAccess } from '../hooks/usePersonalAccess.js';

const OffTheClockTrigger = () => {
  const navigate = useNavigate();

  const unlockPersonal = () => {
    unlockPersonalAccess();
    navigate('/personal');
  };

  return (
    <button
      className='off-the-clock-trigger'
      type='button'
      aria-label='Discover Off the Clock'
      onClick={unlockPersonal}
    >
      <span className='off-the-clock-dot' aria-hidden='true' />
      <span className='off-the-clock-reveal' aria-hidden='true'>
        <span className='off-the-clock-line' />
        <span className='off-the-clock-label'>
          Off the Clock <span className='off-the-clock-arrow'>→</span>
        </span>
        <span className='off-the-clock-line' />
      </span>
    </button>
  );
};

export default OffTheClockTrigger;
