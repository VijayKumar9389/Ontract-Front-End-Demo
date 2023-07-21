import axios from 'axios';

import './StakeholderRouteForm.scss';
import { FaRegSave, FaRegEye } from 'react-icons/fa';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';

import React from 'react'

const StakeholderRouteForm = ({ location }) => {

    const table = 'Wascana_2044';

    function removeStakeholder(id) {
        axios.delete(`http://localhost:5500/delivery/remove/${table}_delivery/${id}`)
            .then((response) => console.log(response.data))
    }

    function deleteRoute() {
        axios.delete(`http://localhost:5500/delivery/delete/${table}_delivery/${location.destination}`)
            .then((response) => console.log(response.data))
    }

    return (
        <form className='stakeholder-route-form'>
            <div className='route-form-cell route-form-name'>
                <label>Stakeholder</label>
                <h4>{location.stakeholder}</h4>
            </div>
            <div className='route-form-cell'>
                <label>Package Details</label>
                <textarea defaultValue={location.package} rows={4}></textarea>
            </div>
            <div className='route-form-cell'>
                <label>Notes</label>
                <textarea defaultValue={location.notes} rows={4}></textarea>
            </div>
            <div className='route-form-cell'>
                <div className='tbl-btn-container'>
                    <button className='tbl-btn' onClick={() => removeStakeholder(location.id)}><FaRegEye className='btn-icon' />VIEW</button>
                    <button className='tbl-btn' onClick={() => removeStakeholder(location.id)}><BsPencilSquare className='btn-icon' />EDIT</button>
                    <button className='tbl-btn' onClick={() => removeStakeholder(location.id)}><BsTrash3 className='btn-icon' />REMOVE</button>
                </div>
            </div>
        </form>
    )
}

export default StakeholderRouteForm