import { useEffect, useState } from 'react';
import './header.css'
import { projectService } from '../services/projectService';

interface Project {
    id: string;
    name: string;
    code?: string;
    // add other fields returned by projectService if needed
}

function Header({ setProject }: { setProject: any }) {
    const [visible, setVisible] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {

        projectService.getAllProjects()
            .then(fetched => {
                setProjects(fetched);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    return (
        <header className={visible ? 'visible' : ''}>
            <div className='logos'>
                <a href="https://vibrandstudio.com" className="logo"></a>
                <span className="user"></span>
            </div>
            <nav>
                {projects.map(project => (
                    <div key={project.id} title={project.name} onClick={() => setProject(project.id)}>
                        <img src="https://husj.vibrandstudio.com/wp-content/uploads/2025/01/HUSJ-logo-emblem.svg" alt={project.name} />
                        <span>{project.code}</span>
                    </div>
                ))}
            </nav>
            <div onClick={() => setVisible(v => !v)} className='hide'>{visible ? '❮' : '❯'}</div>
        </header>
    );
}

export { Header };