import { getStakeholders } from '../../services/api';
import { useState, useEffect } from 'react';

import './Stakeholders.scss';

import { MdKeyboardArrowDown } from 'react-icons/md';

import StakeholderMobileRow from '../../components/MobileRow/StakeholderMobileRow/StakeholderMobileRow';
import StakeholderTable from '../../components/Table/StakeholderTable/StakeholderTable';
import StakeholderFilter from '../../components/Filter/StakeholderFilter/StakeholderFilter';

const Stakeholders = () => {

    const [stakeholders, setStakeholders] = useState([]);
    const isMobile = window.innerWidth <= 768;
    const table = 'Wascana_2044';

    useEffect(() => {
        getStakeholders(table)
            .then((res) => {
                setStakeholders(res.data);
            });
    }, []);

    const stakeholderList = (stakeholders) => {
        return (
            <ul className='stakeholder-list'>
                {stakeholders.map((stakeholder, index) => {
                    return <StakeholderMobileRow key={index} stakeholderInfo={stakeholder} />
                })}
            </ul>
        )
    }

    return (
        <div className='stakeholder-container'>

            <div className='page-header'>
                <h1>Stakeholders</h1>
                <button>
                    Wascana 2044
                    <MdKeyboardArrowDown className='icon' />
                </button>
            </div>

            <div className='body'>
                <StakeholderFilter />

                <div className='tbl-export'>
                    <button>Export Stakeholders: {stakeholders.length}</button>
                </div>

                {isMobile
                    ? stakeholderList(stakeholders)
                    : <StakeholderTable stakeholders={stakeholders} />
                }

            </div>

        </div>
    )
}

export default Stakeholders
