import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setValue, setSearch } from '../../../store/stakeholderReducer';


import './StakeholderFilter.scss';
import { FaFilter } from 'react-icons/fa';

import React from 'react'
import MenuFilter from '../MenuFilter/MenuFilter';

const StakeholderFilter = () => {

    const [isOpen, setIsOpen] = useState(false);
    const value = useSelector(state => state.stakeholder.value);
    const search = useSelector(state => state.stakeholder.search.txt);
    const dispatch = useDispatch();

    function toggle() {
        setIsOpen(!isOpen)
    }

    return (
        <div className="stakeholder-filter-container">

            <MenuFilter isOpen={isOpen} toggle={toggle} />

            <div className="filter-ddl">
                <label>View:</label>
                <select value={value} onChange={(event) => dispatch(setValue(event.target.value))}>
                    <option value={0}>All</option>
                    <option value={1}>Contacted</option>
                    <option value={2}>Not Contacted</option>
                    <option value={3}>Attempted</option>
                    <option value={4}>Not Attempted</option>
                </select>
            </div>

            <div className="filter-search">
                <label>Search:</label>
                <input type="text" placeholder="Search" value={ search || ''} onChange={event => dispatch(setSearch(event.target.value))}/>
            </div>

            <div className="filter-button">
                <label>Filter:</label>
                <button onClick={() => toggle()} ><FaFilter /></button>
            </div>
        </div>
    );
}

export default StakeholderFilter