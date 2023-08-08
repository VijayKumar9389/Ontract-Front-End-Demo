import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { getDeliverys } from '../../../services/api';
import axios from 'axios';

import './DeliveryForm.scss';

const DeliveryForm = ({ stakeholder, isOpen, toggle }) => {
  const [deliverys, setDeliverys] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const project = useSelector((state) => state.project.project);

  useEffect(() => {
    getDeliverys(project).then((res) => setDeliverys(res.data));
    getAddressess();
  }, []);

  async function getAddressess() {
    try {
      const response = await axios.get(`http://localhost:5500/stakeholder/address/${project}`);
      setAddresses(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAddressList = (addresses, type) => {
    if (!addresses) {
      return [];
    }
  
    if (type === 0) {
      return addresses.addressList || [];
    } else {
      return addresses.mailingList || [];
    }
  };

  const [location, setLocation] = useState({
    mailing: stakeholder.MAILING || '',
    street: stakeholder.STREET || '',
  });

  const [deliveryFormData, setDeliveryFormData] = useState({
    name: stakeholder.NAME || '',
    deliveryPackage: '',
    notes: '',
    type: 0,
    destination: null,
    route: '',
  });

  const typeName = (type) => {
    switch (type) {
      case 0:
        return 'Mail';
      case 1:
        return 'Person';
      default:
        return 'Addon';
    }
  };

  const handleRouteChange = (event) => {
    const { name, value } = event.target;
    setDeliveryFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'destination' ? parseInt(value) : value,
    }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === 'destination') {
      setDeliveryFormData((prevFormData) => ({
        ...prevFormData,
        route: '', // Update destination value
      }));
    }

    if (name === 'route') {
      setDeliveryFormData((prevFormData) => ({
        ...prevFormData,
        route: value, // Update route value
      }));
    } else {
      setDeliveryFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === 'destination' || name === 'route' ? parseInt(value) : value,
      }));
    }
  };

  const handleDestinationTypeChange = (event) => {
    setDeliveryFormData((prevFormData) => ({
      ...prevFormData,
      type: parseInt(event.target.value),
      destination: null,
      route: '',
    }));
  };

  const useCurrentRouteChange = (event) => {
    const { name, value } = event.target;
    setDeliveryFormData((prevFormData) => ({
      ...prevFormData,
      route: value,
      destination: null,
    }));
  };

  const getDestinationOptions = (location, type) => {
    switch (type) {
      case 0:
        return location.mailing ? (
          <li className='input-wrapper'>
            <input
              type='radio'
              id='currentMailing'
              name='route'
              value={location.mailing}
              checked={deliveryFormData.route === location.mailing}
              onChange={useCurrentRouteChange}
            />
            <label htmlFor='currentMailing'>Current Mailing</label>
          </li>
        ) : null;
      case 1:
        return location.street ? (
          <>
            <li className='input-wrapper'>
              <input
                type='radio'
                id='currentStreet'
                name='route'
                value={location.street}
                checked={deliveryFormData.route === location.street}
                onChange={useCurrentRouteChange}
              />
              <label htmlFor='currentStreet'>Current Street</label>
            </li>
          </>
        ) : null;
      default:
        return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { deliveryPackage, notes, type, destination, route } = deliveryFormData;

    axios
      .put(`http://localhost:5500/delivery/schedule/${project}_delivery`, {
        destination: route,
        type: typeName(type),
        stakeholder: stakeholder.NAME,
        package: deliveryPackage,
        complete: '',
        notes: notes,
        tag: '',
      })
      .then((response) => {
        console.log(response.data);
        toggle();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderSubmitButton = () => {
    return (
      <button className={deliveryFormData.route !== '' ? 'active' : 'inactive'} type='submit' disabled={deliveryFormData.route === ''}>
        Submit
      </button>
    );
  };

  if (isOpen) {
    return (
      <div className='window-container'>
        <div className='window-background' onClick={() => toggle()}></div>
        <div className='window-wrapper'>
          <div className='popup-header'>
            <h2>Create Delivery</h2>
            <button className='btn-close' onClick={() => toggle()}>
              <IoClose className='icon purple' />
            </button>
          </div>

          <form className='delivery-form' onSubmit={handleSubmit}>
            <div className='window-body'>
              <div className='form-group'>
                <label className='input-lbl' htmlFor='package'>
                  Package
                </label>
                <textarea id='package' name='deliveryPackage' rows={4} value={deliveryFormData.deliveryPackage} onChange={handleFormChange} />
              </div>

              <div className='form-group'>
                <label className='input-lbl' htmlFor='notes'>
                  Notes
                </label>
                <textarea id='notes' name='notes' rows={4} value={deliveryFormData.notes} onChange={handleFormChange} />
              </div>

              <div className='form-group'>
                <label className='input-lbl'>Type</label>
                <ul className='radio-wrapper'>
                  <li className='input-wrapper'>
                    <input type='radio' id='mail' name='type' value={0} checked={deliveryFormData.type === 0} onChange={handleDestinationTypeChange} />
                    <label htmlFor='mail'>Mail</label>
                  </li>
                  <li className='input-wrapper'>
                    <input
                      type='radio'
                      id='in-person'
                      name='type'
                      value={1}
                      checked={deliveryFormData.type === 1}
                      onChange={handleDestinationTypeChange}
                    />
                    <label htmlFor='in-person'>In-Person</label>
                  </li>
                  <li className='input-wrapper'>
                    <input type='radio' id='add' name='type' value={2} checked={deliveryFormData.type === 2} onChange={handleDestinationTypeChange} />
                    <label htmlFor='add'>Add</label>
                  </li>
                </ul>
              </div>

              {(deliveryFormData.type === 0 || deliveryFormData.type === 1) && (
                <div className='form-group'>
                  <label className='input-lbl'>Destination</label>
                  <ul className='radio-wrapper'>
                    {getDestinationOptions(location, deliveryFormData.type)}
                    <li className='input-wrapper'>
                      <input
                        type='radio'
                        id='custom'
                        name='destination'
                        value={1}
                        checked={deliveryFormData.destination === 1}
                        onChange={handleFormChange}
                      />
                      <label htmlFor='custom'>Custom</label>
                    </li>
                    <li className='input-wrapper'>
                      <input
                        type='radio'
                        id='other'
                        name='destination'
                        value={2}
                        checked={deliveryFormData.destination === 2}
                        onChange={handleFormChange}
                      />
                      <label htmlFor='other'>Other Stakeholder</label>
                    </li>
                  </ul>
                </div>
              )}

              {deliveryFormData.type === 2 && (
                <div className='list-container'>
                  <label className='input-lbl'>Current Deliveries:</label>
                  <ul className='list-wrapper'>
                    <input className='list-search-input' placeholder='Search Mailing Addressess' />
                    {deliverys.map((delivery, index) => (
                      <label key={index}>
                        <input
                          type='radio'
                          name='route'
                          value={delivery[0].destination}
                          checked={deliveryFormData.route === delivery[0].destination}
                          onChange={handleRouteChange}
                        />
                        <div className='list-info'>
                          <p>{delivery[0].destination}</p>
                          <p>{delivery[0].type}</p>
                        </div>
                      </label>
                    ))}
                  </ul>
                </div>
              )}

              {deliveryFormData.destination === 2 && (
                <div className='list-container'>
                  <label className='input-lbl'>Other Stakeholder</label>
                  <ul className='list-wrapper'>
                    <input className='list-search-input' placeholder='Search Mailing Addressess' />
                    {getAddressList(addresses, deliveryFormData.type).map((address, index) => (
                      <label key={index}>
                        <input
                          type='radio'
                          name='route'
                          value={address.address}
                          checked={deliveryFormData.route === address.address}
                          onChange={handleRouteChange}
                        />
                        <div className='list-info'>
                          <p className='list-info-name'>{address.name}</p>
                          <p className='list-info-address'>{address.address}</p>
                        </div>
                      </label>
                    ))}
                  </ul>
                </div>
              )}

              {deliveryFormData.destination === 1 && (
                <div className='form-group'>
                  <label className='input-lbl' htmlFor='custom'>
                    Custom Location
                  </label>
                  <textarea id='custom' name='route' rows={4} onChange={handleFormChange} />
                </div>
              )}
            </div>

            <div className='popup-footer'>{renderSubmitButton()}</div>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DeliveryForm;
