import React, { useState } from 'react';
import axios from 'axios';
import { read, utils } from 'xlsx';

import './CreateProject.scss';

const ExcelFileUploader = () => {
    const [jsonData, setJsonData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

            // Transform each row to have exactly 21 items with blank cells
            const transformedData = jsonData.map((row) => {
                const newRow = [];
                for (let i = 0; i < 21; i++) {
                    const cellValue = row[i] || ''; // Insert blank if cell value is undefined
                    newRow.push(cellValue);
                }
                return newRow;
            });

            setJsonData(transformedData);
        };

        reader.readAsArrayBuffer(file);
    };

    const sendDataToAPI = (data) => {
        const apiUrl = 'http://localhost:5500/project/insert';

        axios
            .put(apiUrl, { data })
            .then((response) => {
                console.log('Data sent successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    };

    return (
        <div className='create-container'>
            <input type="file" onChange={handleFileUpload} />
            <button onClick={() => sendDataToAPI(jsonData)}>Send</button>
            <div className='create-wrapper'>
                {jsonData && (
                    <div className="create-list-container">
                        <ul>
                            {jsonData.slice(1).map((row, rowIndex) => (
                                <li key={rowIndex}>
                                    <div className='create-list-item'>
                                        {jsonData[0].map((cellData, cellIndex) => (
                                            <div className='create-item-wrapper' key={cellIndex}>
                                                <dt>{cellData}:</dt>
                                                <dd>{row[cellIndex]}</dd>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExcelFileUploader;
