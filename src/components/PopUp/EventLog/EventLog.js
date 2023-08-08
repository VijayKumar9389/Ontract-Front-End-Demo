import './EventLog.scss';
import { AiOutlineClose } from 'react-icons/ai';

function EventLog({ isOpen, toggle, Day, change }) {

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString(undefined, options);
      }
      
      // Example usage
      const formattedDate = formatDate('2022-12-03');
      console.log(formattedDate); 

    if (isOpen)
        return (
            <div className='event-container'>
                <div className='event-background' onClick={() => toggle()} />
                <div className='event-wrapper'>
                    <div className='event-heading'>
                        <h1>{formatDate(Day)}</h1>
                        <button onClick={() => toggle()}>&times;</button>
                    </div>

                    <ul className='event-list'>
                        {change.map((record, index) => {

                            let change = record.changes.split('\n');
                            change.pop();

                            if (record.date === Day)
                                return (
                                    <li className='event-item'>

                                        <div className='item-wrapper'><h3>{record.info}</h3></div>
                                        <div className='item-wrapper'><label>Changes By {record.user}</label></div>

                                        {change.map((record, index) => {
                                            let part = record.split(' >> ');
                                            return (
                                                <div className='event-info'>
                                                    <div className='info-event'><h3>{part[0]}:</h3></div>
                                                    <div className='info-previous'><label>From</label><label className='lbl-from'>{part[1]}</label></div>
                                                    <div className='info-current'><label>To</label><label className='lbl-to'>{part[2]}</label></div>
                                                </div>
                                            )
                                        })}
                                    </li>
                                )
                        })}
                    </ul>
                </div>
            </div>
        )
}

export default EventLog;