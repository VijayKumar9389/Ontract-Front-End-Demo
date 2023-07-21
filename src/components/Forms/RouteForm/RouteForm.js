import './RouteForm.scss';
import { GrDeliver } from 'react-icons/gr';
import { MdOutlineDeliveryDining } from 'react-icons/md';

const RouteForm = ({ route }) => {

    return (
        <form class="route-form">
            <div className='column-header'><h3>Details</h3><MdOutlineDeliveryDining /></div>

            <div class="input-wrapper">
                <label for="type">Type:</label>
                <select id="type" name="type">
                    <option value="Mail">Mail Out</option>
                    <option value="Person">In Person</option>
                </select>
            </div>

            <div class="input-wrapper">
                <label for="tag">Zone:</label>
                <input type="text" defaultValue='Regina' id="tag" name="tag" />
            </div>

            <div class="input-wrapper">
                <label for="complete">Completed:</label>
                <input type="date" id="complete" name="complete" />
            </div>

            <div className='route-btn-container'>
                <button className='btn-delete' type="submit">EDIT</button>
            </div>
        </form>
    );
}

export default RouteForm;