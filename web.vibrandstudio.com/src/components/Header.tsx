/**
 * Header.tsx
 * 
 * Navigation header component displaying project list and user menu.
 */

import './header.css';
import { ErrorNotification } from './ErrorNotification';
import { useHeader } from '../hooks/useHeader';
import { getImageUrl } from '../utils/urlUtils';

/**
 * Header
 * 
 * Displays the application header with:
 * - Logo (links to vibrandstudio.com)
 * - User avatar (click to change password)
 * - Project navigation menu
 * - Add Project button
 * - Toggle button to show/hide header
 * 
 * Props:
 * - setProject: (id: number) => void - Callback to navigate to a project
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.setProject - Callback function to set the current project/page
 * @returns {JSX.Element} The header component
 * 
 * @example
 * <Header setProject={setCurrentPage} />
 */
function Header({ setProject }: { setProject: any }) {
    const {
        visible,
        setVisible,
        projects,
        user,
        error,
        setError
    } = useHeader();

    return (
        <>
            <ErrorNotification error={error} onClose={() => setError(null)} />
            <header className={visible ? 'visible' : ''}>
            <div className='logos'>
                <a href="https://vibrandstudio.com" className="logo"></a>
                <span
                    onClick={() => setProject(-2)}
                    style={{ backgroundImage: `url(${getImageUrl(user?.image || '')})` }}
                    className="user"
                ></span>
            </div>

            <nav>
                {projects.map(project => (
                    <div key={project.id} title={project.name} onClick={() => setProject(project.id)}>
                        <img src={getImageUrl(project.client?.image || '')} alt={project.name} />
                        <span>{project.code}</span>
                    </div>
                ))}

                <div>
                    <span onClick={() => setProject(-1)}>Add Project</span>
                </div>
            </nav>

            <div onClick={() => setVisible(v => !v)} className='hide'>
                {visible ? '❮' : '❯'}
            </div>
            </header>
        </>
    );
}

export { Header };