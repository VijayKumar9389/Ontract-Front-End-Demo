import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './Dashboard.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Dashboard = () => {

    const [stakeholderReport, setStakeholderReport] = useState([]);
    const [deliveryReport, setDeliveryReport] = useState([]);
    const table = 'Wascana_2044'

    useEffect(() => {
        getStakeholderReport();
        getDeliveryReport();
    }, []);

    async function getStakeholderReport() {
        axios.get(`http://localhost:5500/stakeholder/report/${table}`)
            .then((response) => setStakeholderReport(response.data));
    }

    async function getDeliveryReport() {
        axios.get(`http://localhost:5500/delivery/stats/report/${table}_delivery`)
            .then((response) => setDeliveryReport(response.data));
    }

    return (
        <div className="dashboard-container">

            <div className='page-header'>
                <h1>Overview</h1>
                <button>
                    Wascana 2044
                    <MdKeyboardArrowDown className='icon' />
                </button>
            </div>

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