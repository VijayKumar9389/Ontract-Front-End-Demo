import './StakeholderFilter.scss';
import {FaFilter} from 'react-icons/fa';

import React from 'react'

const StakeholderFilter = () => {
    return (
        <div className="stakeholder-filter-container">

            <div className="filter-ddl">
                <label>View:</label>
                <select>
                    <option value="all">All</option>
                    <option value="contacted">Contacted</option>
                    <option value="not-contacted">Not Contacted</option>
                </select>
            </div>

            <div className="filter-search">
                <label>Search:</label>
                <input type="text" placeholder="Search" />
            </div>

            <div className="filter-button">
                <label>Filter:</label>
                <button><FaFilter /></button>
            </div>
        </div>
    );

}

export default StakeholderFilter