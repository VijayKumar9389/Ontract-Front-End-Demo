import './DeliveryFilter.scss';

import React from 'react'

const DeliveryFilter = () => {
    return (
        <div className='filter-container'>

            <div className="filter-ddl">
                <label>View:</label>
                <select>
                    <option value="all">All</option>
                    <option value="contacted">Contacted</option>
                    <option value="not-contacted">Not Contacted</option>
                </select>
            </div>


            <div className="filter-ddl">
                <label>Zone:</label>
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
        </div>
    )
}

export default DeliveryFilter