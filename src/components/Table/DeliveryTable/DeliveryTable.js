import { useState, useEffect } from 'react';

import './DeliveryTable.scss';
import DeliveryTableRow from '../../TableRow/DeliveryTableRow/DeliveryTableRow';
import { BiMailSend } from 'react-icons/bi';
import { TbTruckDelivery } from 'react-icons/tb';

const DeliveryTable = ({deliverys}) => {

    if (deliverys) return (
        <table className='delivery-tbl'>
            <thead>
                <tr>
                    <th>Route</th>
                    <th>Type</th>
                    <th>Stakeholders</th>
                    <th>Tag</th>
                    <th>Competed</th>
                </tr>
            </thead>
            <tbody>
                {deliverys.map((route, index) => {
                    return (<DeliveryTableRow key={index} deliveryInfo={route} />)
                })}
            </tbody>
        </table>
    );
}

export default DeliveryTable;

