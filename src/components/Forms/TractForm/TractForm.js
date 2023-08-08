import { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegSave, FaRegEye } from 'react-icons/fa';

import './TractForm.scss';
import { useSelector } from 'react-redux';

const TractForm = ({ tract, index }) => {
    const nav = useNavigate();

    const {
        STRUCTURE_TYPE,
        INTEREST,
        OCCUPANTS,
        WORKED,
        COMMENTS,
        ID,
        NAME,
        PIN,
    } = tract;

    const [newStructure, setNewStructure] = useState(STRUCTURE_TYPE);
    const [newStatus, setNewStatus] = useState(INTEREST);
    const [newOccupants, setNewOccupants] = useState(OCCUPANTS);
    const [newWorksLand, setNewWorksLand] = useState(WORKED);
    const [newComments, setNewComments] = useState(COMMENTS);
    const project = useSelector((state) => state.project.project);

    const pin = PIN.split('/');

    const Update = () => {
        axios
            .put(
                `http://localhost:5500/stakeholder/update/tract/${project}/${ID}`,
                {
                    ID,
                    STRUCTURE_TYPE: newStructure,
                    INTEREST: newStatus,
                    OCCUPANTS: newOccupants,
                    WORKED: newWorksLand,
                    COMMENTS: newComments,
                },
                {
                    headers: { 'access-token': localStorage.getItem('access-token') },
                }
            )
            .then((response) => {
                // Handle success
                console.log(response.data);
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    }

    function selectStakeholder(stakeholderInfo) {
        window.scrollTo(0, 0);
        nav(`/stakeholders/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo,
            },
        });
    }

    return (
        <form className="tract-form">
            <div className="tract-form-name">
                <label>Stakeholder</label>
                <div className="tract-name-wrapper">
                    {index === 0 ? (
                        <h4>{NAME}</h4>
                    ) : (
                        <h4 style={{ color: 'black' }}>{NAME}</h4>
                    )}
                    <p>{INTEREST}</p>
                </div>
            </div>
            <div className="tract-form-cell">
                <label>Occupants:</label>
                <textarea
                    defaultValue={OCCUPANTS}
                    onChange={(event) => setNewOccupants(event.target.value)}
                />
            </div>
            <div className="tract-form-cell">
                <label>Works land:</label>
                <select
                    defaultValue={WORKED}
                    onChange={(event) => setNewWorksLand(event.target.value)}
                >
                    <option value="">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
            </div>
            <div className="tract-form-cell">
                <label>Structure:</label>
                <textarea
                    className="tract-form-structure"
                    defaultValue={STRUCTURE_TYPE}
                    onChange={(event) => setNewStructure(event.target.value)}
                />
            </div>
            <div className="tract-form-cell">
                <label>Comments:</label>
                <textarea
                    className="tract-form-comment"
                    defaultValue={COMMENTS}
                    onChange={(event) => setNewComments(event.target.value)}
                />
            </div>
            <div className="tract-form-name">
                <label>Options</label>
                <div className="tbl-btn-container">
                    <button
                        className="tbl-btn"
                        type="button"
                        onClick={Update}
                    >
                        <FaRegSave className="btn-icon" /> SAVE
                    </button>
                    {index === 0 ? null : (
                        <button
                            className="tbl-btn"
                            type="button"
                            onClick={() => selectStakeholder(tract)}
                        >
                            <FaRegEye className="btn-icon" /> VIEW
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default TractForm;
