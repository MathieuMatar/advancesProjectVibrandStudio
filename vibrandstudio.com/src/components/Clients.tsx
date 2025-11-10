import './clients.css';
import { useEffect, useRef } from 'react';
import useClients from '../hooks/useClients';

type ClientsProps = {
    active?: boolean;
};

function Clients({ active }: ClientsProps) {
    const { clients } = useClients();
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const playedRef = useRef<boolean[]>([]); // track which videos have played

    useEffect(() => {
        // Initialize playedRef array
        playedRef.current = clients.map(() => false);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target as HTMLVideoElement;
                    const index = videoRefs.current.indexOf(video);

                    if (entry.isIntersecting && !playedRef.current[index]) {
                        video.play().catch(() => {});
                        playedRef.current[index] = true; // mark as played
                    }
                });
            },
            { threshold: 0.5 } // video must be 50% visible
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, [clients]);

    return (
        <div className="clients-track" style={{ maxHeight: active ? '10000px' : '600px' }}>
            {clients.map((item) => (
                <video
                    key={item.id}
                    src={`http://localhost:3000/uploads${item.image}`}
                    title={item.name}
                    muted
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    playsInline
                />
            ))}
        </div>
    );
}

export { Clients };
