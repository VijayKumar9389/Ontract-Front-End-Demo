import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConnections } from '../../../services/api';
import './Connections.scss';
import { FaHome } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';


const Connections = ({ stakeholder }) => {

    const [connections, setConnections] = useState([]);

    const table = 'Wascana_2044';

    function extractMatchingNumbers(str1, str2) {
        // Split the input strings into segments by comma
        const segments1 = str1.split(",");
        const segments2 = str2.split(",");

        // Initialize an array to store the matching segments
        const matchingSegments = [];

        // Iterate over each segment in the first string
        for (let segment1 of segments1) {
            // Extract the number from the segment
            const number1 = segment1.match(/\d+/);

            // Skip if no number found in the segment
            if (!number1) continue;

            // Iterate over each segment in the second string
            for (let segment2 of segments2) {
                // Extract the number from the segment
                const number2 = segment2.match(/\d+/);

                // Skip if no number found in the segment
                if (!number2) continue;

                // Compare the numbers
                if (number1[0] === number2[0]) {
                    // Numbers match, add the segment to the matching segments array
                    matchingSegments.push(segment1.trim());
                    break; // Stop comparing further segments in the second string
                }
            }
        }

        // Join the matching segments into a new string
        const matchingNumbersString = matchingSegments.join(", ");

        return matchingNumbersString;
    }

    // Example usage
    const string1 = "HOME: 1-(306)-584-1489, OTHER: 1-(306)-539-2370";
    const string2 = "HOME: 1-(306)-584-1489, CELL: 1-(306)-596-2351, OTHER: 1-(306)-539-2370";

    const result = extractMatchingNumbers(string1, string2);
    console.log(result);

    useEffect(() => {
        getConnections(table, stakeholder.NAME)
            .then((response) => setConnections(response.data));
    }, [stakeholder.NAME]);

    return (
        <div className='connections-container'>

            <div className='column-header'><h3>Connections</h3><FaUserAlt /></div>

            {connections.length === 0 
            ? <p>No connections found.</p> 
            :             <ul>
            {connections.map((record, index) => {
                return (
                    <Link key={index} className='link' onClick={() => window.scrollTo(0, 0)} to={`/${record.stakeholder.NAME}`} state={{ stakeholder: record.stakeholder }}>
                        <div className='stakeholder-item'>
                            <h3>{record.stakeholder.NAME}</h3>
                            {record.phone && (
                                <div className='info-wrapper'>
                                    <FaPhone className="icon" />
                                    <a>{extractMatchingNumbers(record.stakeholder.PHONE, stakeholder.PHONE)}</a>
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