import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDeliverys } from '../../services/api';
import { setOpen } from '../../store/projectReducer';

// Internal Components
import DeliveryFilter from '../../components/Filter/DeliveryFilter/DeliveryFilter';
import DeliveryTable from '../../components/Table/DeliveryTable/DeliveryTable';
import DeliveryMobileRow from '../../components/MobileRow/DeliveryMobileRow/DeliveryMobileRow';

// External Libraries
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TbSettingsSearch } from 'react-icons/tb';

// Internal Styles
import './Deliverys.scss';
import Heading from '../../components/Heading/Heading';

const Deliverys = () => {

    // State Hooks
    const [deliverys, setDeliverys] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Redux Hooks
    const project = useSelector(state => state.project.project);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData(project);
    }, [project]);

    const fetchData = async (project) => {
        try {
            const response = await getDeliverys(project);
            setDeliverys(response);
        } catch (error) {
            console.error('Error fetching deliverys:', error);
        }
    }

    return (
        <div className='delivery-container'>
            <Heading title={"Deliverys"} />
            <div className='body'>
                <DeliveryFilter />

                <div className='tbl-export'>
                    <button>Export Deliverys: {deliverys.length}</button>
                </div>

                {isMobile ? (
                    <ul className='stakeholder-list'>
                        {deliverys.map((delivery, index) => {
                            return <DeliveryMobileRow key={index} deliveryInfo={delivery} />
                        })}
                    </ul>
                ) : (
                    <DeliveryTable deliverys={deliverys} />
                )}
            </div>
        </div>
    )
}

export default Deliverys