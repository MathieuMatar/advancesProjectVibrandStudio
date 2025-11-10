import './about.css';
import color from '../assets/color.png';

function About() {
    return (
        <>
            <div className='aboutTitle'>
                <h1>About Us</h1>
                <p>We are a team of passionate individuals committed to delivering the best services to our clients. Our expertise lies in understanding client needs and crafting tailored solutions that drive results. We are a team of passionate individuals committed to delivering the best services to our clients. Our expertise lies in understanding client needs and crafting tailored solutions that drive results. We are a team of passionate individuals committed to delivering the best services to our clients. </p>
            </div>
            <div className="circleTop"></div>
            <div className='bannerImg' style={{ backgroundImage: `linear-gradient(to top, white 3%, transparent 36%), url(${color})` }}>
                <div className='circleBtm'></div>
            </div>
            <br />
            <br />
            <br />

            <h1>The Team</h1>
        </>
    );
}

export { About };