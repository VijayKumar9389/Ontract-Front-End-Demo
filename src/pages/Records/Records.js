import { useState, useEffect } from 'react';
import axios from 'axios';

import './Records.scss';
import Calendar from '../../components/Calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { setOpen } from '../../store/projectReducer';
import Heading from '../../components/Heading/Heading';

function Records() {

    const [data, setData] = useState([]);
    const [last, setlast] = useState([]);
    const [user, setUser] = useState([]);
    const [filter, setFilter] = useState('');
    const [logs, setLogs] = useState([]);
    const [select, setSelect] = useState(null);
    const dispatch = useDispatch();
    const table = 'Wascana_2044'

    useEffect(() => {
        // getUsers();
        getLastLog();
        // getLogs();
        getUsers();
        setSelect(null);
    }, [filter]);

    // async function getUsers() {
    //     await axios.get(`${process.env.REACT_APP_BACKEND_URL}/record/getAll/${table}_delivery`, {
    //         headers: {
    //             "access-token": localStorage.getItem("access-token"),
    //         },
    //     }).then((response) => setUser(response.data));
    // }

    // async function getLogs() {
    //     await axios.get(`http://localhost:5500/record/getAll/${table}_records`)
    //         .then((response) => setLogs(response.data));
    // }

    async function getUsers() {
        await axios.get(`http://localhost:5500/user/users`)
            .then((response) => setUser(response.data));
    }

    async function getLastLog() {
        await axios.get(`http://localhost:5500/record/getMonths/${table}_records/${filter}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setlast(response.data));
    }

    function getMonthName(monthNo) {
        const date = new Date();
        date.setMonth(monthNo - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    function back() {
        setSelect(null);
    }

    return (
        <div className='record-container'>
            
          <Heading title={"Records"} />

            <div className='body'>
                <div className='record-filter'>
                    <label>Users: </label>
                    <select defaultValue={null} onChange={(event) => setFilter(event.target.value)}>
                        <option value={''}>All Users</option>
                        {user.map((user, index) => {
                            return <option key={index} value={user.username}>{user.username}</option>
                        })}
                    </select>
                </div>
                <div className='tbl-export'>
                    <button>Export Records: {logs.length}</button>
                </div>
                {select ? <Calendar Start={select} Back={back} log={select} Filter={filter} />
                    : <table className='record-tbl'>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Changes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {last.map((log, index) => {
                                return (
                                    <tr key={index} onClick={() => setSelect(log)}>
                                        <th>{getMonthName(log.month)}</th>
                                        <th>{log.year}</th>
                                        <th>{log.count}</th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Records;