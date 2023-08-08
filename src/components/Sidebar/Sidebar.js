import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../store/userReducer';

import './Sidebar.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import { FaTruck, FaClipboardList } from 'react-icons/fa';
import { BsFillBoxSeamFill } from 'react-icons/bs';
import { RiHistoryFill } from 'react-icons/ri';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import NavMenu from '../PopUp/NavMenu/NavMenu';

export const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const project = useSelector((state) => state.project.project);
    const dispatch = useDispatch();

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='sidebar-container'>

            <div className='sidebar-logo'>
                <h1>OnTract</h1>
            </div>
            
            <NavMenu isOpen={isOpen} toggle={toggle} />

            <ul className='nav-menu'>

                <NavLink exact activeClassName='active' className='nav-link' to='/'>
                    <AiOutlineDashboard className='icon' /> Dashboard
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' to='/stakeholders'>
                    <IoMdContacts className='icon' /> Stakeholders
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' to='/deliverys'>
                    <FaTruck className='icon' /> Deliverys
                </NavLink>
                {/* <NavLink activeClassName='active' className='nav-link' to='/inventory'>
                    <BsFillBoxSeamFill className='icon' /> Inventory
                </NavLink> */}
                <NavLink activeClassName='active' className='nav-link' to='/records'>
                    <RiHistoryFill className='icon' /> Records
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' to='/projects'>
                    <FaClipboardList className='icon' /> Projects
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' to='/accounts'>
                    <MdAccountCircle className='icon' /> Accounts
                </NavLink>
            </ul>

            <button className='logout-btn' onClick={() => dispatch(setLogout())}> Logout <MdLogout className='icon purple' /></button>

            <div className='nav-menu-btn'>
                <button onClick={() => toggle()}><GiHamburgerMenu className='icon' /></button>
            </div>
        </div>
    )
}


export default Sidebar;