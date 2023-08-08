import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../store/projectReducer';
import CreateProject from '../../components/CreateProject/CreateProject';

import './Project.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Projects = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        axios.get('http://localhost:5500/project/getAll')
            .then((response) => setProjects(response.data))
            .then(() => setIsLoading(false));
    }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="projects-page">
            <div className='page-header'>
                <h1>Projects</h1>
                <button onClick={() => dispatch(setOpen())}>
                    Wascana 2044
                    <MdKeyboardArrowDown className='icon' />
                </button>
            </div>

            <div className='body'>
                <table className="project-table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => {
                            const [name, year] = project.split('_');
                            return (
                                <tr key={index} className="project-row">
                                    <td >{name}</td>
                                    <td >{year}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <CreateProject />

            {/* <button className="projects-page__create-btn" onClick={handleCreateProject}>
        Create New Project
      </button> */}
            {/* 
      <CreateProject /> */}
        </div>
    )
}

export default Projects;