import './DeliveryTable.scss';
import DeliveryTableRow from '../../TableRow/DeliveryTableRow/DeliveryTableRow';

const DeliveryTable = ({ deliverys }) => {
    if (!deliverys || deliverys.length === 0) {
      return <div>No data available</div>;
    }
  
    return (
      <table className='delivery-tbl'>
        <thead>
          <tr>
            <th>Route</th>
            <th>Type</th>
            <th>Stakeholders</th>
            <th>Tag</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {deliverys.map((route, index) => {
            return <DeliveryTableRow key={index} deliveryInfo={route} />;
          })}
        </tbody>
      </table>
    );
  };
export default DeliveryTable;

