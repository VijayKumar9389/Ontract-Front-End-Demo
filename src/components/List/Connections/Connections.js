import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getConnections } from '../../../services/api';
import './Connections.scss';
import { FaHome } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';


const Connections = ({ stakeholder }) => {

    const [connections, setConnections] = useState([]);

    const project = useSelector((state) => state.project.project);

    useEffect(() => {
        getConnections(project, stakeholder.NAME)
            .then((response) => setConnections(response.data));
    }, [stakeholder.NAME]);

    return (
        <div className='connections-container'>

            <div className='column-header'><h3>Connections</h3><FaUserAlt /></div>
            {console.log(connections)}
            {connections.length === 0
                ? <p>No connections found.</p>
                : <ul>
                    {connections.map((record, index) => {
                        return (
                            <Link key={index} className='link' onClick={() => window.scrollTo(0, 0)} to={`/stakeholders/${record.stakeholder.NAME}`} state={{ stakeholder: record.stakeholder }}>
                                <div className='stakeholder-item'>
                                    <h3>{record.stakeholder.NAME}</h3>
                                    {record.phone && (
                                        <div className='info-wrapper'>
                                            <FaPhone className="icon" />
                                            <a>{record.stakeholder.PHONE}</a>
                                        </div>
                                    )}
                                    {record.address && (
                                        <div className='info-wrapper'>
                                            <MdMail className="icon" />
                                            <a>{record.stakeholder.MAILING}</a>
                                        </div>
                                    )}
                                    {record.street && (
                                        <div className='info-wrapper'>
                                            <FaHome className="icon" />
                                            <a>{record.stakeholder.STREET}</a>
                                        </div>
                                    )}
                                </div>
                            </Link>

                        );
                    })}
                </ul>
            }


        </div>
    )
}

export default Connections;