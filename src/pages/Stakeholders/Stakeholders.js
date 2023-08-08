import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Internal Components
import StakeholderMobileRow from '../../components/MobileRow/StakeholderMobileRow/StakeholderMobileRow';
import StakeholderTable from '../../components/Table/StakeholderTable/StakeholderTable';
import StakeholderFilter from '../../components/Filter/StakeholderFilter/StakeholderFilter';
import Heading from '../../components/Heading/Heading';

// Internal Styles
import './Stakeholders.scss';

// Internal Utility Functions
import { filterStakeholders } from '../../utils/dataUtils';

// Internal API and Redux Actions
import { getStakeholders } from '../../services/api';

const Stakeholders = () => {
    // State Hooks
    const [stakeholders, setStakeholders] = useState([]);

    // Computed Values
    const isMobile = window.innerWidth <= 1024;

    // Redux Hooks
    const search = useSelector((state) => state.stakeholder);
    const project = useSelector((state) => state.project.project);

    // State for loading and error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper Function
    const filteredStakeholders = filterStakeholders(stakeholders, search);

    useEffect(() => {
        fetchData(project);
    }, [project]);


    const fetchData = async (project) => {
        try {
            const response = await getStakeholders(project);
            setStakeholders(response);
            console.log(response);
            setError(null); // Reset the error state if data is fetched successfully
            setLoading(false); // Set loading state to false
        } catch (error) {
            console.error('Error fetching stakeholders:', error);
            setError('Failed to fetch stakeholders');
            setLoading(false); // Set loading state to false
        }
    };

    switch (true) {
        case loading:
            return <div>Loading data...</div>;
        case error:
            return <div>Error: {error}</div>;
        default:
            return (
                <div className='stakeholder-container'>
                    <Heading title={'Stakeholders'} />
                    <div className='body'>
                        <StakeholderFilter />
                        <div className='tbl-export'>
                            <button>Export Stakeholders: {filteredStakeholders.length}</button>
                        </div>
                        {isMobile ? (
                            <ul className='stakeholder-list'>
                                {filteredStakeholders.map((stakeholder, index) => {
                                    return <StakeholderMobileRow key={index} stakeholderInfo={stakeholder} />;
                                })}
                            </ul>
                        ) : (
                            <StakeholderTable stakeholders={filteredStakeholders} />
                        )}
                    </div>
                </div>
            );
    }
};

export default Stakeholders;
