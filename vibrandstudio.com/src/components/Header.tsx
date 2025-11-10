import { useState, useEffect } from 'react';
import './header.css';
import Logo from '../svg/logo.svg?react';
import HomeLogo from '../svg/home.svg?react';
import { Link } from "react-router-dom";

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={scrolled ? 'header-active' : 'header-top'}>
            <Link to="/" style={{ all: 'unset', cursor: 'pointer' }}>
                <Logo className="logo" />
                <HomeLogo stroke="var(--coral)" className="home" style={{ marginLeft: '10px', marginRight: '5px' }} width="25" />
            </Link>
            <nav>
                <Link to="/services">Services</Link>
                <Link to="/clients">Clients</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/ngo">Sacred Branding</Link>
            </nav>
            <Link to="/contact" className="ct">Let’s Talk</Link>
            <a href="/login" className="sn stop">Sign In</a>
        </header>
    );
}

export { Header };