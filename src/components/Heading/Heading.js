import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { setOpen } from '../../store/projectReducer';

import './Heading.scss';

const Heading = ({ title }) => {

    const dispatch = useDispatch();
    const project = useSelector(state => state.project.project);

    return (
        <div className='page-header'>
            <h1>{title}</h1>
            <button onClick={() => dispatch(setOpen())}>
                {project}
                <MdKeyboardArrowDown className='icon' />
            </button>
        </div>
    );
}

export default Heading