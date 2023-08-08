import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im';
import { FaTruckMoving } from 'react-icons/fa';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import './StakeholderForm.scss';

import Connections from '../../List/Connections/Connections';
import { useSelector } from 'react-redux';

const StakeholderForm = ({ stakeholder, toggle }) => {
  const navigate = useNavigate();
  const project = useSelector((state) => state.project.project);

  const {
    NAME,
    CONTACTED,
    CONTACT,
    CORPERATION,
    STAKEHOLDERCOMMENT,
    STREET,
    MAILING,
    PHONE,
    EMAIL,
    ATTEMPTS,
    CONSULTATION,
    FOLLOWUP,
  } = stakeholder;

  const [formData, setFormData] = useState({
    name: NAME || '',
    contacted: CONTACTED || '',
    status: CONTACT || '',
    corporation: CORPERATION || '',
    stakeholderComment: STAKEHOLDERCOMMENT || '',
    homeAddress: STREET || '',
    mailingAddress: MAILING || '',
    phoneNumber: PHONE || '',
    email: EMAIL || '',
    attemptDates: ATTEMPTS || '',
    consultationDate: CONSULTATION || '',
    followUp: FOLLOWUP || '',
  });

  const isFormDataUpdated = () => {
    if (
      NAME !== formData.name ||
      CONTACTED !== formData.contacted ||
      CONTACT !== formData.status ||
      CORPERATION !== formData.corporation ||
      STAKEHOLDERCOMMENT !== formData.stakeholderComment ||
      STREET !== formData.homeAddress ||
      MAILING !== formData.mailingAddress ||
      PHONE !== formData.phoneNumber ||
      EMAIL !== formData.email ||
      ATTEMPTS !== formData.attemptDates ||
      CONSULTATION !== formData.consultationDate ||
      FOLLOWUP !== formData.followUp
    ) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5500/stakeholder/update/stakeholder/${project}/${NAME}`, formData)
      .then((response) => {
        if (!response.data.status) {
          // Handle the case when the API call fails
          // You can show an error message or perform any other action here
        } else {
          // API call is successful, navigate to the new stakeholder page
          navigate(`/stakeholders/${formData.name}`, {
            replace: true,
            state: {
              stakeholder: {
                NAME: formData.name,
                CONTACT: formData.contacted,
                STREET: formData.homeAddress,
                MAILING: formData.mailingAddress,
                PHONE: formData.phoneNumber,
                CONTACTED: formData.contacted,
                ATTEMPTS: formData.attemptDates,
                CONSULTATION: formData.consultationDate,
                FOLLOWUP: formData.followUp,
                EMAIL: formData.email,
                STAKEHOLDERCOMMENT: formData.stakeholderComment,
                CORPORATION: formData.corporation,
              },
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle any error that occurs during the API call
      });
  };

    return (
        <form className='stakeholder-form' onSubmit={handleSubmit}>
            <div className="form-heading">
                <h2>{stakeholder.NAME}</h2>
            </div>
            <div className='form-heading-btn'>
                {isFormDataUpdated() ? (
                    <button className='active' type="submit">Submit</button>
                ) : (
                    <button className='inactive' type="submit" disabled>Submit</button>
                )}
                <button type="button">Survey</button>
                <button type="button" onClick={() => toggle()}>Set Delivery</button>
            </div>
            <div className='stakeholder-form-body'>
                <div className='stakeholder-form-wrapper'>
                    <div className="category general">
                        <div className='column-header'><h3>General</h3><FaUserAlt /></div>
                        <div className='form-column'>
                            <div className="form-row">
                                <label htmlFor="name">Name</label>
                                <textarea
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    rows={4}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="stakeholderComment">Stakeholder Comment</label>
                                <textarea
                                    id="stakeholderComment"
                                    name="stakeholderComment"
                                    value={formData.stakeholderComment}
                                    onChange={handleChange}
                                    placeholder="Stakeholder Comment"
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className='form-column'>
                            <div className='ddl-wrapper'>
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="GREEN">GREEN</option>
                                    <option value="YELLOW">YELLOW</option>
                                    <option value="RED">RED</option>
                                </select>
                            </div>
                            <div className='ddl-wrapper'>
                                <label htmlFor="corporation">Corporation</label>
                                <select
                                    id="corporation"
                                    name="corporation"
                                    value={formData.corporation}
                                    onChange={handleChange}
                                >
                                    <option value="">N/A</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="category location">
                        <div className='column-header'><h3>Location</h3><ImLocation2 /></div>
                        <div className='form-column'>
                            <div className="form-row">
                                <label htmlFor="homeAddress">Home Address</label>
                                <textarea
                                    id="homeAddress"
                                    name="homeAddress"
                                    value={formData.homeAddress}
                                    onChange={handleChange}
                                    placeholder="Home Address"
                                    rows={4}
                                />
                                {console.log(stakeholder)}
                            </div>
                            <div className="form-row">
                                <label htmlFor="mailingAddress">Mailing Address</label>
                                <textarea
                                    id="mailingAddress"
                                    name="mailingAddress"
                                    value={formData.mailingAddress}
                                    onChange={handleChange}
                                    placeholder="Mailing Address"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="category contact">
                        <div className='column-header'><h3>Contact</h3><BsChatLeftTextFill /></div>
                        <div className='form-column'>
                            <div className="form-row">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <textarea
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    rows={4}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="category consultation">
                        <div className='column-header'><h3>Delivery</h3><FaTruckMoving /></div>
                        <div className='form-column'>
                            <div className='ddl-wrapper'>
                                <label htmlFor="contacted">Contacted</label>
                                <select
                                    id="contacted"
                                    name="contacted"
                                    value={formData.contacted}
                                    onChange={handleChange}
                                >
                                    <option value="">N/A</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label htmlFor="consultationDate">Consultation Date</label>
                                <input
                                    type="text"
                                    id="consultationDate"
                                    name="consultationDate"
                                    value={formData.consultationDate}
                                    onChange={handleChange}
                                    placeholder="Consultation Date"
                                />
                            </div>
                        </div>

                        <div className="form-column">
                            <div className="form-row">
                                <label htmlFor="attemptDates">Attempt Dates</label>
                                <input
                                    type="text"
                                    id="attemptDates"
                                    name="attemptDates"
                                    value={formData.attemptDates}
                                    onChange={handleChange}
                                    placeholder="Attempt Dates"
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="followUp">Follow Up</label>
                                <input
                                    type="text"
                                    id="followUp"
                                    name="followUp"
                                    value={formData.followUp}
                                    onChange={handleChange}
                                    placeholder="Follow Up"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='connections-wrapper'>
                    <Connections stakeholder={stakeholder} />
                </div>
            </div>
        </form>
    );
};

export default StakeholderForm;
