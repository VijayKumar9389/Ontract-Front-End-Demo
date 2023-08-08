import './MenuFilter.scss';

import { AiOutlineClose } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {VscClearAll} from 'react-icons/vsc';

import { clear, setCity, setProvince, setSearchType, setStakeholderType, setAttempted, setContacted } from '../../../store/stakeholderReducer';


function MenuFilter({ isOpen, toggle }) {

    const [locationList, setLocationList] = useState([]);
    const dispatch = useDispatch();

    const table = 'Wascana_2044';
    
    const province = useSelector((state) => state.stakeholder.province);
    const city = useSelector((state) => state.stakeholder.city);
    const searchType = useSelector((state) => state.stakeholder.search.type);
    const stakeholderType = useSelector((state) => state.stakeholder.stakeholder);
    const Attempted = useSelector((state) => state.stakeholder.attempted);
    const Contacted = useSelector((state) => state.stakeholder.contacted);

    useEffect(() => {
        axios.get(`http://localhost:5500/stakeholder/locations/${table}`)
            .then((response) => setLocationList(response.data));
    }, [province]);

    function getCity(location, data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].province === location) {
                console.log(data[i])
                return data[i];
            }
        }
    }

    if (isOpen) return (
    
        <div className='popup-container'>
            <div className='popup-background' onClick={() => toggle()}></div>
            <div className='popup-wrapper'>

                <div className='filter-heading'>
                    <h2>Filters</h2>
                   <button className='btn-close' onClick={() => toggle()}><IoCloseSharp className='icon' /></button> 
                </div>

                <div className='filter-menu'>

                    <div className='filter-wrapper'>
                        <label>Province/State:</label>
                        <select value={province} onChange={(event) => dispatch(setProvince(event.target.value))}>
                            <option value={""}>All</option>
                            {locationList.map((location, index) => {
                                return <option key={index} value={location.province}>{location.province}</option>
                            })}
                        </select>
                    </div>

                    {province
                        ? <div className='filter-wrapper'>
                            <label>City:</label>
                            <select defaultValue={city} onChange={(event) => dispatch(setCity(event.target.value))}>
                                <option value={null}>All</option>
                                {getCity(province, locationList).cities.map((city, index) => {
                                    return <option key={index} value={city.name}>{city.name}</option>
                                })}
                            </select>
                        </div>
                        : null}

                    <div className='radio-container'>
                        <label>Search By:</label>
                        <ul className='radio-wrapper'>
                            <li className='input-wrapper'><input type="radio" id="name" checked={searchType === 0} onChange={() => dispatch(setSearchType(0))} /> <label for="name">Name</label></li>
                            <li className='input-wrapper'><input type="radio" id="phone" checked={searchType === 1} onChange={() => dispatch(setSearchType(1))} /> <label for="phone">Phone Number</label></li>
                        </ul>
                    </div>

                    <div className='radio-container'>
                        <label>Tracts:</label>
                        <ul className='radio-wrapper'>
                            <li className='input-wrapper'><input type="radio" id="all-stakeholders" checked={stakeholderType === 0} onChange={() => dispatch(setStakeholderType(0))} /> <label for="all-stakeholders">All Stakeholders</label> </li>
                            <li className='input-wrapper'><input type="radio" id="single-tract" checked={stakeholderType === 1} onChange={() => dispatch(setStakeholderType(1))} /> <label for="single-tract">Single-Tract</label></li>
                            <li className='input-wrapper'><input type="radio" id="multi-tract" checked={stakeholderType === 2} onChange={() => dispatch(setStakeholderType(2))} /> <label for="multi-tract">Multi-Tract</label></li>
                        </ul>
                    </div>
                    <div className='radio-container'>
                        <label>Type:</label>
                        <div className='radio-wrapper'>
                            <div className='input-wrapper'><input type="radio" id="all-contacted" checked={Contacted === null} onChange={() => dispatch(setContacted(null))} /> <label for="all-contacted" >All</label> </div>
                            <div className='input-wrapper'><input type="radio" id="yes-contacted" checked={Contacted === true} onChange={() => dispatch(setContacted(true))} /> <label for="yes-contacted">Corperation</label> </div>
                            <div className='input-wrapper'><input type="radio" id="no-contacted" checked={Contacted === false} onChange={() => dispatch(setContacted(false))} /> <label for="no-contacted">Person</label> </div>
                        </div>
                    </div>
                    <div className='radio-container'>
                        <label>Missing:</label>
                        <div className='radio-wrapper'>
                            <div className='input-wrapper'><input type="radio" id="all-attempted" checked={Attempted === null} onChange={() => dispatch(setAttempted(null))} /> <label for="all-attempted">None</label> </div>
                            <div className='input-wrapper'><input type="radio" id="yes-attempted" checked={Attempted === true} onChange={() => dispatch(setAttempted(true))} /> <label for="yes-attempted">Missing Number</label> </div>
                            <div className='input-wrapper'><input type="radio" id="no-attempted" checked={Attempted === false} onChange={() => dispatch(setAttempted(false))} /> <label for="no-attempted">Missing Address</label> </div>
                        </div>
                    </div>
                </div>
                <div className='filter-btn-menu'>
                    <button onClick={() => dispatch(clear())}>  Clear Filters <VscClearAll className='btn-icon'/></button>
                </div>
            </div>
        </div>
    )
}


export default MenuFilter;

