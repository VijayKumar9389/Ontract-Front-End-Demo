import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './TractForm.scss';
import { FaRegSave, FaRegEye } from 'react-icons/fa';

const TractForm = ({ tract, index }) => {
    const nav = useNavigate();

    const [newStructure, setNewnewStructure] = useState(tract.STRUCTURE_TYPE);
    const [newStatus, setNewStatus] = useState(tract.INTEREST);
    const [newOccupants, setNewOccupants] = useState(tract.OCCUPANTS);
    const [newWorksLand, setnewWorksLand] = useState(tract.WORKED);
    const [newComments, setNewComments] = useState(tract.COMMENTS);

    const pin = tract.PIN.split("/");

    const Update = (id) => {
        axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/tracts/update`,
            {
                ID: id,
                STRUCTURE_TYPE: newStructure,
                INTEREST: newStatus,
                OCCUPANTS: newOccupants,
                WORKED: newWorksLand,
                COMMENTS: newComments
            },
            {
                headers: { "access-token": localStorage.getItem("access-token") }
            }
        );
    }

    function selectStakeholder(stakeholderInfo) {
        window.scrollTo(0, 0);
        nav(`/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo
            }
        });
    }

    return (
        <form className='tract-form'>

            <div className='tract-form-cell tract-form-name'>

                <label>Stakeholder</label>

                <div className='tract-name-wrapper'>
                    {index === 0 ? <h4 >{tract.NAME}</h4> : <h4 style={{ color: 'black' }}>{tract.NAME}</h4>}
                    <p>{tract.INTEREST}</p>
                </div>

            </div>

            <div className='tract-form-cell'>
                <label>Occupants:</label>
                <textarea defaultValue={tract.OCCUPANTS} onChange={(event) => setNewOccupants(event.target.value)}></textarea>
            </div>

            <div className='tract-form-cell'>
                <label>Works land:</label>
                <select defaultValue={tract.WORKED} onChange={(event) => setnewWorksLand(event.target.value)}>
                    <option value="">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
            </div>

            <div className='tract-form-cell'>
                <label>Structure:</label>
                <textarea className='tract-form-structure' defaultValue={tract.STRUCTURE_TYPE} onChange={(event) => setNewnewStructure(event.target.value)}></textarea>
            </div>

            <div className='tract-form-cell'>
                <label>Comments:</label>
                <textarea className='tract-form-comment' defaultValue={tract.COMMENTS} onChange={(event) => setNewComments(event.target.value)}></textarea>
            </div>

            <div className='tract-form-cell'>
                <label>Options</label>
                <div className='tbl-btn-container'>
                    <button className='tbl-btn' onClick={() => Update(tract.ID)}> <FaRegSave className='btn-icon' /> SAVE </button>
                    {index === 0 ? null : <button className='tbl-btn' onClick={() => selectStakeholder(tract)}> <FaRegEye className='btn-icon' /> VIEW </button>}
                </div>
            </div>

        </form>


    );
}

export default TractForm;
