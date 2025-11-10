import { useNavigate, useParams } from "react-router-dom";
import './project.css';
import { useState, useEffect } from "react";

function Project() {
    const [gallery, setGallery] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const back = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/projects");
        }
    };

    // Prevent background scroll while popup is open
    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, []);

    return (
        <div className="popup-shadow" onClick={back}>
            <div className="single-project" onClick={(e) => e.stopPropagation()}>
                <iframe
                    className={gallery === '' ? 'active' : ''}
                    style={{ gridArea: '1 / 1 / 2 / 3' }}
                    src="https://alyasa.vibrandstudio.com"
                    title="Project Preview"
                />
                <img
                    className={`gallery ${gallery !== '' ? 'active' : ''}`}
                    style={{ gridArea: '1 / 1 / 2 / 3' }}
                    src={gallery ?? ''}
                    alt="Project gallery"
                />
                <img
                    onClick={() => setGallery('')}
                    className="iframe"
                    style={{ gridArea: '2 / 1 / 3 / 2' }}
                    src="/temp/alyasa.vibrandstudio.com_.png"
                    alt="Project thumbnail"
                />
                <div className="slide-guide" style={{ gridArea: '2 / 2 / 3 / 3' }}>
                    <img
                        src="/temp/alyasa.vibrandstudio.com_.png"
                        onClick={() => setGallery('/temp/alyasa.vibrandstudio.com_.png')}
                        alt="Gallery item 1"
                    />
                    <img
                        src="/temp/alyasa.vibrandstudio.com_.png"
                        onClick={() => setGallery('/temp/alyasa.vibrandstudio.com_.png')}
                        alt="Gallery item 2"
                    />
                    <img
                        src="/temp/alyasa.vibrandstudio.com_.png"
                        onClick={() => setGallery('/temp/alyasa.vibrandstudio.com_.png')}
                        alt="Gallery item 3"
                    />
                    <img
                        src="/temp/alyasa.vibrandstudio.com_.png"
                        onClick={() => setGallery('/temp/alyasa.vibrandstudio.com_.png')}
                        alt="Gallery item 4"
                    />
                    <img
                        src="/temp/alyasa.vibrandstudio.com_.png"
                        onClick={() => setGallery('/temp/alyasa.vibrandstudio.com_.png')}
                        alt="Gallery item 5"
                    />
                </div>
            </div>
        </div>
    );
}

export { Project };
