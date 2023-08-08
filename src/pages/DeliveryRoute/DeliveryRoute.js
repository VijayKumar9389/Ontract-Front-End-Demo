import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './DeliveryRoute.scss';
import { FaRegSave, FaRegEye } from 'react-icons/fa';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';

import RouteForm from '../../components/Forms/RouteForm/RouteForm';
import StakeholderRouteForm from '../../components/Forms/StakeholderRouteForm/StakeholderRouteForm';

const DeliveryRoute = () => {

    const { state } = useLocation();
    const { info } = state;
    const navigate = useNavigate();
    const [deliveryList, setDeliveryList] = useState([]);

    const table = 'Wascana_2044';



    function deleteRoute() {
        axios.delete(`http://localhost:5500/delivery/delete/${table}_delivery/${info[0].destination}`)
          .then((response) => {
            console.log(response.data);
            // Go back to the previous page after successful deletion
            navigate(-1);
          })
          .catch((error) => {
            console.error(error);
            // Handle any error that occurs during the API call
          });
      }
      

    function printForms(info) {

        const stakeholderRouteForms = info.map((tract, index) => (
            <StakeholderRouteForm key={index} location={tract} />
        ));

        return (
            <ul>
                <div className='column-header'><h3>Delivery Sakeholders</h3></div>
                {stakeholderRouteForms}
            </ul>
        );
    }

    return (
        <div className='route-container'>

            <div className='heading'>
                <h2>{info[0].destination}</h2>
            </div>


            <div class="route-wrapper">
                <RouteForm table={table} route={info.destination} />
                {printForms(info)}
            </div>

            <div className='btn-container'>
            <button className='btn-delete' onClick={deleteRoute} > Delete</button>

            </div>
        </div>
    );
}

export default DeliveryRoute;