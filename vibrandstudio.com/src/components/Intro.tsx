import './intro.css';

function Intro() {
    return (
        <section className="intro">
            Hey there, we’re Vibrand Studio agency
            <h1>Where Mental Agility Meets Creative Expression</h1>
            Founded 4 years ago on the principle of mental agility,<br />
            Vibrand has been at the forefront of creative innovation.
            <div>
                <a href="mailto:VibrandStudio@gmail.com">VibrandStudio@gmail.com</a>
                <a href="tel:+9613778899">+961 3 77 88 99 </a>
                <a className="btn">More Info</a>
            </div>
        </section>
    );
}

export { Intro };