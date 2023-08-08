import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPojects } from '../../../services/api';
import { IoCloseSharp } from 'react-icons/io5';

import './ProjectTable.scss';
import { setOpen, setProject } from '../../../store/projectReducer';

function ProjectTable() {
    // State Hooks
    const [projects, setProjects] = useState([]);

    // Redux Selectors
    const isOpen = useSelector((state) => state.project.isOpen);

    // State for loading and error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Redux Dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getPojects();
            setProjects(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to fetch projects');
            setLoading(false);
        }
    }

    switch (true) {
        case loading:
            return <div>Loading...</div>;

        case error:
            return <div>Error: {error}</div>;

        case isOpen:
            return (
                <div className='select-container'>
                    <div className='select-background' onClick={() => dispatch(setOpen())}></div>
                    <div className='project-popup'>
                        <div className='popup-header'>
                            <h2>Select Project</h2>
                            <button onClick={() => dispatch(setOpen())}>
                                <IoCloseSharp className='icon' />
                            </button>
                        </div>
                        <div className='project-table-body'>
                            {projects.length === 0 ? (
                                <div className='no-data-message'>No projects available.</div>
                            ) : (
                                <table className='address-tbl'>
                                    <thead>
                                        <tr>
                                            <th>Project</th>
                                            <th>Year</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <input placeholder='Search Projects' />
                                            </th>
                                            <th>
                                                <input placeholder='Search year' />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((project, index) => {
                                            let details = project.split('_');
                                            return (
                                                <tr key={index} onClick={() => dispatch(setProject(project))}>
                                                    <td>{details[0]}</td>
                                                    <td>{details[1]}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            );

        default:
            return null; // Don't render the component when isOpen is false
    }
}

export default ProjectTable;
