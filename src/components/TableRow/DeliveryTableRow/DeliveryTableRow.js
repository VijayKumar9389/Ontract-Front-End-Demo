import { useNavigate, useLocation } from 'react-router-dom';

import './DeliveryTableRow.scss';

const DeliveryTableRow = ({ deliveryInfo }) => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const delivery = deliveryInfo[0];

  function selectRoute() {
    nav(`${currentPath}/${delivery.destination}`, {
      state: {
        info: deliveryInfo
      }
    });
  }

  function getStakeholders(array) {
    return array.map((item, index) => (
      <span key={index}>{item.stakeholder}</span>
    ));
  }

  return (
    <tr className='delivery-tbl-row' onClick={selectRoute}>
      <td>{delivery.destination}</td>
      <td>{delivery.type}</td>
      <td>{getStakeholders(deliveryInfo).length}</td>
      <td>{delivery.tag}</td>
      <td>{delivery.complete === '' ? <a>Pending</a> : <av>Yes</av>}</td>
    </tr>
  );
};

export default DeliveryTableRow;
