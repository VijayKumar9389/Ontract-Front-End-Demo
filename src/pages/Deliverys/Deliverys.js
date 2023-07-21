import { useState, useEffect } from 'react';
import { getDeliverys } from '../../services/api'; 

import './Deliverys.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';

import React from 'react'
import DeliveryFilter from '../../components/Filter/DeliveryFilter/DeliveryFilter';
import DeliveryTable from '../../components/Table/DeliveryTable/DeliveryTable';
import { TbSettingsSearch } from 'react-icons/tb';

const Deliverys = () => {

    const [deliverys, setDeliverys] = useState([]);
    const table = 'Wascana_2044';

    useEffect(() => {
        // Get delivery data from database
        getDeliverys(table)
            .then((response) => setDeliverys(response.data));
    }, []);

    return (
        <div className='delivery-container'>
            <div className='page-header'>
                <h1>Deliverys</h1>
                <button>
                    Wascana 2044
                    <MdKeyboardArrowDown className='icon' />
                </button>
            </div>
            <div className='body'>
                <DeliveryFilter />

                <div className='tbl-export'>
                    <button>Export Deliverys: </button>
                </div>

                <DeliveryTable deliverys={deliverys} />
            </div>
        </div>
    )
}

export default Deliverys