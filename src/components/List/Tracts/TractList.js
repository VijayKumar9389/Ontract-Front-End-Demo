import React, { useEffect, useState } from 'react';
import { getRelatedTracts } from '../../../services/api';

import './TractList.scss';
import TractForm from '../../Forms/TractForm/TractForm';

import { FaUserAlt } from 'react-icons/fa';

const TractList = ({ name }) => {

    const table = 'Wascana_2044';
    const [relatedTracts, setRelatedTracts] = useState([]);

    useEffect(() => {
        getRelatedTracts(table, name)
            .then((response) => setRelatedTracts(response.data));
    }, [name]);

    function PrintRow(list) {

        const pin = list[0].PIN.split("/");
        const location = pin[1];
        const tract = list[0].TRACT;
        const commodity = list[0].COMMODITY;
        const piplineStatus = list[0].PIPELINESTATUS;

        const tractForms = list.map((stakeholder, index) => (
            <TractForm key={index} tract={stakeholder} index={index} />
        ));

        return (
            <ul className='tract-record'>
                <div className='tract-header'>
                    <h3>Tract: {tract}</h3>
                    <p>
                        Carrying: <span className="list-item">{commodity}</span>
                        <span className="separator">|</span>
                        Currently: <span className="list-item">{piplineStatus}</span>
                        <span className="separator">|</span>
                        Located: <span className="list-item">{location}</span>
                    </p>
                    <button>View Neighbors</button>
                </div>
                {tractForms}
            </ul>
        );
    }

    return (
        <div className='tract-list-container'>
            <div className='padding'><div className='column-header'><h3>Affiliated Tracts</h3><FaUserAlt /></div></div>
            {relatedTracts.map(PrintRow)}
        </div>
    );
}

export default TractList;