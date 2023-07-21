import './StakeholderMobileRow.scss';
import { useNavigate } from 'react-router-dom';

import React from 'react'

const StakeholderMobileRow = ({stakeholderInfo}) => {
    const nav = useNavigate();

    function selectStakeholder(stakeholder) {
        window.scrollTo(0, 0);
        nav(`/stakeholders/${stakeholder.NAME}`, {
            state: {
                stakeholder: firstStakeholder,
            },
        });
    }

    function getInterestList(array) {
        const listItems = [];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            listItems.push(<li key={index}>{element.NAME}</li>);
        }

        // return <ul className="interest-list">{listItems}</ul>;

        return listItems.length;
    }

    const firstStakeholder = stakeholderInfo[0]; // Accessing the first object

    let location = firstStakeholder.MAILING.split(",");
    let attemps = firstStakeholder.ATTEMPTS.split(",");

    console.log(stakeholderInfo);

    return (
        <li className='stakeholder-list-item' onClick={() => selectStakeholder(firstStakeholder)}>
                <h3>{firstStakeholder.NAME}</h3>

                <label>{location.length >= 3 ? location[location.length - 3] : "N/A"}, {location.length >= 3 ? location[location.length - 2] : "N/A"}</label>

                <p>
                    Affiliated Tracts:&nbsp; <span className="list-item">{getInterestList(stakeholderInfo)}</span>
                    <span className="separator">|</span>
                    Number Available:&nbsp; <span className="list-item">{firstStakeholder.PHONE.length > 1 ? "Yes" : "No"}</span>
                    <span className="separator">|</span>
                    Contact Attempts:&nbsp; <span className="list-item">{attemps[0] !== "" ? attemps.length : 0}</span>
                    <span className="separator">|</span>
                    Contact Status:&nbsp; <span className="list-item">{firstStakeholder.CONTACT}</span>
                </p>



        </li>
    );
}

export default StakeholderMobileRow