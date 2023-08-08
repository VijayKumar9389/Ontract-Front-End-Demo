import { useDispatch } from 'react-redux';
import { setLogout } from '../../../store/userReducer';

import './NavMenu.scss';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { AiOutlineDashboard } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import { FaTruck, FaClipboardList } from 'react-icons/fa';
import { BsFillBoxSeamFill } from 'react-icons/bs';
import { RiHistoryFill } from 'react-icons/ri';
import { MdAccountCircle, MdLogout } from 'react-icons/md';

function NavMenu({ isOpen, toggle }) {

    const dispatch = useDispatch();

    function scrollTop() {
        window.scrollTo(0, 0);
        toggle();
    }

    const open = {
        opacity: '100%',
        top: '0'
    };

    const closed = {
        opacity: '0',
        top: '-100%'
    };

    return (
        <div className='nav-container' style={isOpen ? open : closed}>
            <div className='nav-icon-wrapper'>
                <FaTimes className='nav-icon' onClick={toggle} />
            </div>
            <ul className='nav-menu'>
                <NavLink exact activeClassName='active' className='nav-link' onClick={scrollTop} to='/'>
                    <AiOutlineDashboard className='icon right' /> Dashboard
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' onClick={scrollTop} to='/stakeholders'>
                    <IoMdContacts className='icon right' /> Stakeholders
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' onClick={scrollTop} to='/deliverys'>
                    <FaTruck className='icon right' /> Deliverys
                </NavLink>
                {/* <NavLink activeClassName='active' className='nav-link' onClick={scrollTop} to='/inventory'>
                    <BsFillBoxSeamFill className='icon right' /> Inventory
                </NavLink> */}
                <NavLink activeClassName='active' className='nav-link' onClick={scrollTop} to='/records'>
                    <RiHistoryFill className='icon right' /> Records
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' onClick={scrollTop} to='/projects'>
                    <FaClipboardList className='icon right' /> Projects
                </NavLink>
                <NavLink activeClassName='active' className='nav-link' onClick={scrollTop} to='/accounts'>
                    <MdAccountCircle className='icon right' /> Accounts
                </NavLink>
            </ul>
            <button className='logout-btn' onClick={() => dispatch(setLogout())}> Logout <MdLogout className='icon purple' /></button>
        </div>

    );

}

export default NavMenu;