import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './projects.css';
import { fetchProjects } from '../store/projectSlice';
import type { RootState, AppDispatch } from '../store/store';

type ProjectsProps = {
    active?: boolean;
};

function Projects({ active = false }: ProjectsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading } = useSelector((state: RootState) => state.projects);
    const [offset, setOffset] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const totalItemWidth = 460;
    const max = totalItemWidth * projects.length;

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

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
                    <div key={index} style={{ backgroundImage: `url(http://localhost:3000/uploads${item.image})` }}>
                        <h2>{item.name}</h2>
                        <h3>{item.client?.name}</h3>
                        {/*<span>date</span>*/}
                        {/* <Link state={{ backgroundLocation: location }} className="btn" to={`/projects/${item.id}`}>View Project</Link> */}
                        <a className="btn">View Project</a>
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