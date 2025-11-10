import './tabs.css';
import { Link, useNavigate } from "react-router-dom";

type TabData = {
    title: string;
    content: React.ReactNode;
    url: string;
};

type TabsProps = {
    data: TabData[];
    active?: number;
};

function Tabs({ data, active = 0 }: TabsProps) {
    const tab = active;
    const navigate = useNavigate();

    return (
        <>
            <div className={`tabs ${tab !== 0 ? "active" : ""}`}>
                {
                    data.map((d, i) => (
                        <div key={i} className={`square${i % 2 === 0 ? " full" : ""}`} onClick={() => navigate(d.url)} >
                            Vibrand Studio
                            <span>{d.title}</span>
                            <Link to={d.url} className="btn">More info</Link>
                        </div>
                    ))
                }
            </div>
            {
                data.map((d, i) => (
                    <div key={i} className="tab" style={{ display: tab === i + 1 ? 'block' : 'none' }}>{d.content}</div>
                ))
            }
        </>
    );
}

export { Tabs };