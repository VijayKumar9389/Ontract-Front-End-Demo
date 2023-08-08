import { useNavigate, useLocation } from 'react-router-dom';

import './DeliveryMobileRow.scss';

const DeliveryMobileRow = ({ deliveryInfo }) => {

    const nav = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
  

    const { route, type, stakeholders, tag, completed } = deliveryInfo;
    const delivery = deliveryInfo[0];

    function selectRoute() {
        nav(`${currentPath}/${delivery.destination}`, {
          state: {
            info: deliveryInfo
          }
        });
      }

    return (
        <li className='delivery-mobile-row' onClick={ selectRoute}>

                <h3>{delivery.destination}</h3>


                    <p>
                        Type:&nbsp; <span className="list-item">{delivery.type}</span>
                        <span className="separator">|</span>
                        Stakeholders:&nbsp; <span className="list-item">{deliveryInfo.length}</span>
                        <span className="separator">|</span>
                        Tag: &nbsp; <span className="list-item">{delivery.tag}</span>
                        <span className="separator">|</span>
                        Completed: &nbsp; <span className="list-item">{delivery.completed === '' ? 'yes' : 'no'}</span>
                    </p>

        </li>
    )
}

export default DeliveryMobileRow