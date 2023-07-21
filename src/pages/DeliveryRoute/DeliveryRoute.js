import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import './DeliveryRoute.scss';
import { FaRegSave, FaRegEye } from 'react-icons/fa';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';

import RouteForm from '../../components/Forms/RouteForm/RouteForm';
import StakeholderRouteForm from '../../components/Forms/StakeholderRouteForm/StakeholderRouteForm';

const DeliveryRoute = () => {

    const { state } = useLocation();
    const { info } = state;
    const [deliveryList, setDeliveryList] = useState([]);

    const table = 'Wascana_2044';

    function printForms(info) {

        const stakeholderRouteForms = info.map((tract, index) => (
            <StakeholderRouteForm key={index} location={tract} />
        ));

        return (
            <ul>
                <div className='column-header'><h3>Sakeholders</h3></div>
                {stakeholderRouteForms}
            </ul>
        );

    }

    return (
        <div className='route-container'>

            <div className='heading'>
                <h2>{info[0].destination}</h2>
                <button > Delete</button>
            </div>


            <div class="route-wrapper">

                <RouteForm table={table} route={info.destination} />
                {printForms(info)}

            </div>
        </div>
    );
}

export default DeliveryRoute;