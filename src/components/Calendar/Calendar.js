import { useState, useEffect } from "react";
import axios from "axios";

import './Calendar.scss';

import { MdArrowBackIosNew } from 'react-icons/md';
import EventLog from "../PopUp/EventLog/EventLog";
import { useSelector } from "react-redux";

function Calendar({ Start, Back, log, Filter }) {

    const [data, setData] = useState([]);
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [day, setDay] = useState();
    const [user, setUser] = useState('All');
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const table = 'Wascana_2044'

    function toggle(day) {
        setDay(day)
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        getLogs();
        setMonth(log.month);
        setYear(log.year);
    }, [log]);

    async function getLogs() {
        await axios.get(`http://localhost:5500/record/getAll/${table}_records/${Filter}`)
            .then((response) => setData(response.data));
    }

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function getMonthName(monthNo) {
        const date = new Date();
        date.setMonth(monthNo);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    function printHeader() {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return days.map((day) => (
            <div className="month-container">{day}</div>
        ));
    }


    function printEvents(arr, date) {

        let events = [];
        let contacts = 0;

        for (let index = 0; index < arr.length; index++) {

            var test = data[index].date.split('-');

            if (test[1] == month && test[0] == year && test[2] == date) {
                events.push(data[index]);

                if (filterContacted(arr[index])) {
                    contacts++
                }
            }
        }

        if (events.length > 0) {
            return ({ edits: events.length, contacted: contacts })
        } else {
            return '';
        }
    }

    function printMonths(log) {
        let td = [];
        let days = daysInMonth(month, year);
        let firstDay = new Date(year, month, 1).getDay();

        for (let index = 0; index < firstDay; index++) {
            td.push(
                <div className="pad-container">

                </div>)
        }

        for (let index = 0; index < days; index++) {

            let events = printEvents(log, pad(index + 1));

            td.push(
                <div className="day-container" onClick={() => toggle(pad(index + 1))}>
                    <label>{pad(index + 1)}</label>
                    {
                        events.edits > 0 ?
                            <>
                                <a className="change-stat"> <a>Changes:</a><label>{events.edits}</label> </a>
                                {events.contacted > 0 ? <a className="contact-stat"><a>Contacted:</a> <label>{events.contacted}</label></a> : null}

                            </>
                            :
                            null
                    }
                </div>)
        }

        return td;
    }

    function filterUser(arr, user) {

        let records = [];
        let contacted = [];

        for (let index = 0; index < arr.length; index++) {
            if (arr[index].user === user) {
                records.push(arr[index]);
                if (filterContacted(arr[index])) {
                    contacted.push(arr[index]);
                }
            }
        }

        return { edits: records.length, contacted: contacted.length };

    }

    function filterContacted(record) {

        let changes = record.changes.split('\n');
        let contact = false;

        for (let index = 0; index < changes.length; index++) {

            let change = changes[index].split('>>');

            if (change[0].trim() === 'Contacted' && change[2].trim() === 'YES') {
                console.log(change)
                contact = true;
            }

        }

        return contact;

    }

    if (data != undefined) return (
        <div className="calendar-container">


            <EventLog isOpen={isOpen} Day={year + '-' + month + '-' + day} change={data} toggle={() => toggle()} />

            {/* <div className="calendar-header">
                <div className="calendar-btn-wrapper">
                    <button className="calendar-btn" onClick={() => Back()}><MdArrowBackIosNew /> </button>
                    <h1>{getMonthName(month - 1)} {year} {day}</h1>
                </div>
            </div> */}

            {/* <div className="user-select">

                <div className="user-stats">
                    <div className="user-item">
                        <label>User</label>
                        <h1>{user}</h1>
                    </div>
                    <div className="user-item">
                        <label>Contacted</label>
                        <h1>{filterUser(data, user).contacted}</h1>
                    </div>
                    <div className="user-item">
                        <label>Changes</label>
                        <h1>{filterUser(data, user).edits}</h1>
                    </div>
                    <div className="user-item">
                        <label>Contacted this month</label>
                    </div>
                    <div className="user-item">
                        <label>Changes this month</label>
                    </div>
                </div>


            </div> */}

            {data != undefined ?
                <div>
                    <div className="calendar-title">
                    {printHeader()}
                    </div>

                    <div className="calendar-wrapper">
                        {printMonths(data)}
                    </div>
                </div>
                : null}
        </div>
    )
}

export default Calendar;