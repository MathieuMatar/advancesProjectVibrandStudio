import { Intro } from '../components/Intro';
import { Part } from '../components/Part';
import { Projects } from '../components/Projects';
import { Clients } from '../components/Clients';
import { Tabs } from '../components/Tabs';
import martine from '../assets/martine.jpg';
import Test from '../components/Test';
import { Link } from 'react-router-dom';

type HomeProps = {
    page?: string;
};

function Home({ page }: HomeProps) {

    return (
        <>
            {page === "home" && (
                <Intro />
            )}
            {(page === "home" || page === "projects") && (
                <Part title="Projects">
                    <Projects active={page === "projects" ? true : false} />
                    {page !== "projects" && (
                        <Link to="/projects" className="btn">View More Projects</Link>
                    )}
                </Part>
            )}
            {(page === "home" || page === "clients") && (
                <Part title="Clients" text={<>Our variety of clients extends among different sectors:<br />Food & Beverages, Hospitality & Real Estate, Medical Services, Education.</>}>
                    <Clients active={page === "clients" ? true : false} />
                    {page !== "clients" && (
                        <Link to="/clients" className="btn">View More Clients</Link>
                    )}
                </Part>
            )}
            {(page === "home" || page === "services" || page === "express") && (
                <Part title="Services" text="We offer 2 types of design packages - want to know more about our offering">
                    <Tabs data={[
                        { title: "Experience", content: <Test text="info about experience" />, url: "/services" },
                        { title: "Express", content: <Test text="info about express" />, url: "/express" }
                    ]} active={page === "services" ? 1 : page === "express" ? 2 : 0} />
                </Part>
            )}
            {(page === "home" || page === "ngo" || page === "sacredbranding") && (
                <Part title="Sacred Branding" text="We offer also other types of Branding">
                    <Tabs data={[
                        { title: "NGOs", content: <Test text="info about ngo" />, url: "/ngo" },
                        { title: "Religious Projects", content: <Test text="info about Religious Projects" />, url: "/sacredbranding" }
                    ]} active={page === "ngo" ? 1 : page === "sacredbranding" ? 2 : 0} />
                </Part>
            )}
            {page === "home" && (
                <Part title="Martine Boutros" text="CEO & co-founder of Vibrand Studios agency">
                    <div>
                        <div className="square" style={{ backgroundImage: `url(${martine})` }} >
                            <a className="btn">More info</a>
                        </div>
                    </div>
                </Part>
            )}
            {page === "home" && (
                <Part title="Let’s Talk" text={<>We’d love to hear from you!<br />Drop us a line, Give us a call or pass by our office.</>}>
                    <br /><br /><br />
                    <a className="btn">More info</a>
                </Part>
            )}
        </>
    );
}

export { Home };