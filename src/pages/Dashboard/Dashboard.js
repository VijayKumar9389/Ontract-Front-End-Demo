// Import React components and hooks
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import API functions
import { getStakeholderReport, getDeliveryReport } from '../../services/api';

// Import custom components
import { MdKeyboardArrowDown } from 'react-icons/md';

// Import styles
import './Dashboard.scss';

// Import Redux action
import Heading from '../../components/Heading/Heading';
const Dashboard = () => {

    const [stakeholderReport, setStakeholderReport] = useState([]);
    const [deliveryReport, setDeliveryReport] = useState([]);
    const project = useSelector((state) => state.project.project);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData(project);
    }, [project]);

    const fetchData = async (project) => {
        try {
            const stakeholderData = await getStakeholderReport(project);
            setStakeholderReport(stakeholderData);

            const deliveryData = await getDeliveryReport(project);
            setDeliveryReport(deliveryData);

        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    return (
        <div className="dashboard-container">

            <Heading title={"Dashboard"} />

            <div className="body">
                <h2 className="dashboard-heading">Stakeholders</h2>
                <div className="dashboard-wrapper">
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Total Stakeholders</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.total}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Stakeholders Contacted</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.contacted}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Remaining Stakeholders</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.remaining}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Attempts to Reach</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.attempted}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">No Attempts to Reach</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.noAttempts}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Stakeholders Consulted</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.consulted}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Non-Consulted Stakeholders</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.noconsulted}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Stakeholders Missing Phone No</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.missingPhone}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Single Tract:</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.single}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Multi Tract:</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.multi}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Corperation:</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.corporation}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">People:</p>
                        <h4 className="dashboard-item-value">{stakeholderReport.person}</h4>
                    </div>
                </div>
                <h2 className="dashboard-heading">Deliveries</h2>
                <div className="dashboard-wrapper">
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Total Deliveries</p>
                        <h4 className="dashboard-item-value">{deliveryReport.total}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Completed Deliveries</p>
                        <h4 className="dashboard-item-value">{deliveryReport.completed}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Mailout Deliveries</p>
                        <h4 className="dashboard-item-value">{deliveryReport.mailout}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Delivery Deliveries</p>
                        <h4 className="dashboard-item-value">{deliveryReport.delivery}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Completed Deliveries</p>
                        <h4 className="dashboard-item-value">{deliveryReport.completed}</h4>
                    </div>
                    <div className="dashboard-item">
                        <p className="dashboard-item-title">Remaining Deliveries</p>
                        <h4 className="dashboard-item-value">{deliveryReport.stakeholders}</h4>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Dashboard;