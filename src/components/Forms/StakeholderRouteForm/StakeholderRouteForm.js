import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import './StakeholderRouteForm.scss';
import { FaRegSave, FaRegEye } from 'react-icons/fa';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';

const StakeholderRouteForm = ({ location }) => {

    const table = 'Wascana_2044';
    const navigate = useNavigate();

    function removeStakeholder(id) {
        axios.delete(`http://localhost:5500/delivery/remove/${table}_delivery/${id}`)
            .then((response) => {
                console.log(response.data);
                // Go back to the previous page after successful deletion
                navigate(-1);
            })
            .catch((error) => {
                console.error(error);
                // Handle any error that occurs during the API call
            });
    }

    function deleteRoute() {
        axios.delete(`http://localhost:5500/delivery/delete/${table}_delivery/${location.destination}`)
            .then((response) => console.log(response.data))
    }

    return (
        <form className='stakeholder-route-form'>
            <div className='stakeholder-form-name'>
                <label>Stakeholder</label>
                <h4>{location.stakeholder}</h4>
            </div>
            <div className='stakeholder-form-cell'>
                <label>Package Details</label>
                <textarea defaultValue={location.package} rows={4}></textarea>
            </div>
            <div className='stakeholder-form-cell'>
                <label>Notes</label>
                <textarea defaultValue={location.notes} rows={4}></textarea>
            </div>
            <div className='stakeholder-form-name'>
                <label>Actions</label>
                <div className='tbl-btn-container'>
                    <button className='tbl-btn' ><FaRegEye className='btn-icon' />VIEW</button>
                    <button className='tbl-btn' ><BsPencilSquare className='btn-icon' />EDIT</button>
                    <button className='tbl-btn' onClick={() => removeStakeholder(location.id)}><BsTrash3 className='btn-icon' />REMOVE</button>
                </div>
            </div>
        </form>
    )
}

export default StakeholderRouteForm