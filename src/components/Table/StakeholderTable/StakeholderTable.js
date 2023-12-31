import './StakeholderTable.scss';
import StakeholderTableRow from '../../TableRow/StakeholderTableRow/StakeholderTableRow';

const StakeholderTable = ({ stakeholders }) => {
    if (!stakeholders || stakeholders.length === 0) {
        return <div>No data available</div>;
    }
    
    return (
        <table className='stakeholder-tbl'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Tracts</th>
                    <th>Contact</th>
                    <th>Attempts</th>
                    <th>Contacted</th>
                </tr>
            </thead>
            <tbody>
                {stakeholders.map((stakeholder, index) => (
                    <StakeholderTableRow key={index} stakeholderInfo={stakeholder} />
                ))}
            </tbody>
        </table>
    )
}

export default StakeholderTable