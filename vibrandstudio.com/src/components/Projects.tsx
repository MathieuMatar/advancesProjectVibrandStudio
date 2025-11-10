import { useState } from 'react';
import './projects.css';
import useProjects from '../hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type ProjectsProps = {
    active?: boolean;
};

function Projects({ active = false }: ProjectsProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { projects } = useProjects();
    const [offset, setOffset] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const totalItemWidth = 460;
    const max = totalItemWidth * projects.length;

    const repeatedItems = [];
    if (active) {
        repeatedItems.push(...projects);
    } else {
        repeatedItems.push(...projects, ...projects, ...projects, ...projects, ...projects);
        if (repeatedItems.length % 2 === 0) {
            repeatedItems.pop();
        }
    }

    const next = () => {
        if (offset <= (-max)) {
            setTransitioning(false);
            setOffset(0);
        }
        setTimeout(() => {
            setTransitioning(true);
            setOffset(prev => prev - totalItemWidth);
        }, 0.00001);
    };

    const prev = () => {
        if (offset >= max) {
            setTransitioning(false);
            setOffset(0);
        }
        setTimeout(() => {
            setTransitioning(true);
            setOffset(prev => prev + totalItemWidth);
        }, 0.00001);
    };

    console.log(repeatedItems)

    return (
        <div className='projects-track'>
            <div className={`${transitioning ? 'transitioning' : ''}`}
                style={{ transform: `translateX(${offset}px)`, flexWrap: active ? 'wrap' : 'nowrap' }}>
                {repeatedItems.map((item, index) => (
                    <div key={index} style={{ backgroundImage: `url(http://localhost:3000${item.image})` }}>
                        <h2>{item.name}</h2>
                        <h3>{item.client?.name}</h3>
                        {/*<span>date</span>*/}
                        <Link state={{ backgroundLocation: location }} className="btn" to={`/projects/${item.id}`}>View Project</Link>
                    </div>
                ))}
            </div>
            {!active && (
                <>
                    <svg onClick={prev} style={{ left: 60 }} viewBox="0 0 8 8"><path d="M5 6 3 4l2-2" /></svg>
                    <svg onClick={next} style={{ right: 60 }} viewBox="0 0 8 8"><path d="m3 6 2-2-2-2" /></svg>
                </>
            )}
        </div>
    );
}

export { Projects };



// onClick={() => navigate(`/projects/${item.id}`)} 