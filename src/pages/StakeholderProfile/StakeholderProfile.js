import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import './StakeholderProfile.scss';
import StakeholderForm from '../../components/Forms/StakeholderForm/StakeholderForm';
import TractList from '../../components/List/Tracts/TractList';
import DeliveryForm from '../../components/Forms/DeliveryForm/DeliveryForm';

const StakeholderProfile = () => {

  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen)
  }
  // Check if the stakeholder object is null
  if (!state || !state.stakeholder) {
    // You can choose to redirect to another page or display an error message
    // For example, to redirect to a 'not found' page:
    // history.push('/not-found');
    return (
      <div className='profile-container'>
        <h2>Stakeholder doesn't exist.</h2>
      </div>
    );
  }

  const { stakeholder } = state;

  return (
    <div className='profile-container'>
      <StakeholderForm key={stakeholder.NAME} stakeholder={stakeholder} toggle={() => toggle()} />
      <div className='tracts'>
        <TractList name={stakeholder.NAME} />
        <DeliveryForm stakeholder={stakeholder} isOpen={isOpen} toggle={() => toggle()} />
      </div>
    </div>
  );
}

export default StakeholderProfile