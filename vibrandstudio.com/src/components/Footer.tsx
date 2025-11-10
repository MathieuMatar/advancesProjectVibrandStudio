import './footer.css';
import Logo from '../svg/logo.svg?react';
import Facebook from '../svg/facebook.svg?react';
import Instagram from '../svg/instagram.svg?react';
import Email from '../svg/email.svg?react';
import LinkedIn from '../svg/linkedin.svg?react';
import Phone from '../svg/phone.svg?react';

function Footer() {
    return (
        <footer>
            <a href="/" style={{ display: 'flex'}}>
                <Logo className="logo" />
            </a>
            <div className="legal">
                <a href="/privacypolicy">Privacy Policy</a>
                <a href="/termsconditions">Terms & Conditions</a>
                <a href="/copyrighttext">Copyright Text</a>
            </div>
            <div className="social">
                <a href="#" title="Facebook" target="_blank" >
                    <Facebook />
                </a>
                <a href="#" title="Instagram" target="_blank" >
                    <Instagram />
                </a>
                <a href="#" title="Email" target="_blank" >
                    <Email />
                </a>
                <a href="#" title="LinkedIn">
                    <LinkedIn />
                </a>
                <a href="#" title="LinkedIn" target="_blank" >
                    <LinkedIn />
                </a>
                <a href="#" title="Phone" target="_blank" >
                    <Phone />
                </a>
            </div>
        </footer>
    );
}

export { Footer };