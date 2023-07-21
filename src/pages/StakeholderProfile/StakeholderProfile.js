import { useLocation } from 'react-router-dom';

import './StakeholderProfile.scss';
import StakeholderForm from '../../components/Forms/StakeholderForm/StakeholderForm';
import TractList from '../../components/List/Tracts/TractList';


const StakeholderProfile = () => {

  const { state } = useLocation();
  const { stakeholder } = state;

  return (
    <div className='profile-container'>
      <StakeholderForm stakeholder={stakeholder} />
      <div className='tracts'>
        <TractList name={stakeholder.NAME} />
      </div>
    </div>

  )
}

export default StakeholderProfile