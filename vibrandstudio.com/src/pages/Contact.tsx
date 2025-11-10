import './contact.css';
import office from '../assets/office.webp';
import { Form } from 'react-router-dom';
import { useState } from 'react';

function Contact() {
    const questions = [
        {
            question: "How can I get in touch with Vibrand's support team?",
            answer: "You can reach out to our support team via the contact form on this page or by emailing us directly at support@vibrand.com."
        },
        {
            question: "What is the typical response time for inquiries?",
            answer: "We strive to respond to all inquiries within 24-48 hours during business days."
        },
        {
            question: "Do you offer custom branding solutions?",
            answer: "Yes, we offer tailored branding solutions to meet the unique needs of each client. Please contact us to discuss your requirements."
        },
        {
            question: "Where is Vibrand located?",
            answer: "Vibrand is headquartered in Creativity City, Imagination Country. Our address is 123 Vibrand St, Creativity City, Imagination Country."
        },
        {
            question: "How can I get in touch with Vibrand's support team?",
            answer: "You can reach out to our support team via the contact form on this page or by emailing us directly at support@vibrand.com."
        },
        {
            question: "What is the typical response time for inquiries?",
            answer: "We strive to respond to all inquiries within 24-48 hours during business days."
        },
        {
            question: "Do you offer custom branding solutions?",
            answer: "Yes, we offer tailored branding solutions to meet the unique needs of each client. Please contact us to discuss your requirements."
        },
        {
            question: "Where is Vibrand located?",
            answer: "Vibrand is headquartered in Creativity City, Imagination Country. Our address is 123 Vibrand St, Creativity City, Imagination Country."
        }
    ];
    return (
        <>
            <div className="contact" style={{ backgroundImage: `url(${office})` }}>
                <div className='info'>
                    <div>
                        <h1>You Have Questions, <br />We Have Answers</h1>
                        <p>Discover experiences you won't find anywhere else - thoughtfully designed to immerse you in the heart of the destination. Soulful stories waiting to be lived.</p>
                    </div>
                    <div className='info-data'>
                        <div>
                            <h3>Location</h3>
                            <p>123 Vibrand St, Creativity City, Imagination Country</p>
                            <p>Monday - Friday: 9 AM - 5 PM</p>
                        </div>
                        <div>
                            <h3>Social Media</h3>
                            <a>Instagram</a>
                            <a>LinkedIn</a>
                            <a>Facebook</a>
                            <a>Twitter</a>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <p>info@vibrand.com</p>
                        </div>
                        <div>
                            <h3>Contact</h3>
                            <p>+1 (234) 567-8901</p>
                        </div>
                    </div>

                </div>
                <form>
                    <h3>Contact Us</h3>
                    <p>Our teams are here to help you. Please fill out the form below to get in touch with us.</p>
                    <div className='input-group'>
                        <input type="text" name="name" placeholder="Full Name" required />
                        <input type="text" name="company" placeholder="Company Name" />
                        <input type="text" name="country" placeholder="Country" />
                        <input type="tel" name="phone" placeholder="Phone Number" required />
                    </div>
                    <input type="email" name="email" placeholder="Email Address" required />
                    <p className='type'>Company Type</p>
                    <div className='radio-group'>
                        <label htmlFor="startup">
                            <input type="radio" name="companyType" value="startup" id='startup' />
                            Startup
                        </label>
                        <label htmlFor="enterprise">
                            <input type="radio" name="companyType" value="enterprise" id='enterprise' />
                            Enterprise
                        </label>
                        <label htmlFor="freelancer">
                            <input type="radio" name="companyType" value="freelancer" id='freelancer' />
                            Freelancer
                        </label>
                    </div>
                    <textarea name="message" placeholder="Your Message" rows={5} required></textarea>
                    <input type='checkbox' name='consent' required /> <span>I agree to receive communications from Vibrand.</span><br />
                    <input type='checkbox' name='privacy' required /> <span>I agree to the privacy policy and terms of service.</span><br />
                    <input type='checkbox' name='terms' required /> <span>I would like to receive exclusive offers and updates.</span><br />
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.807963336621!2d35.64359927569535!3d34.12566571384991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f5d9e6957da0b%3A0x619d2dd7ddcb8fa9!2sVibrandStudio!5e0!3m2!1sen!2slb!4v1761637567321!5m2!1sen!2slb"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vibrand Studio Map"
            ></iframe>

            <div className='faq'>
                <div>
                    <h2>Frequently Asked <br />Questions</h2>
                    <br />
                    <p>Contact us if you still have any questions to <br />make your experience smoother.</p>
                </div>
                <div className='questions'>
                    {questions.map((qa, index) => (
                        <Question key={index} nbr={index + 1} question={qa.question} answer={qa.answer} />
                    ))}
                </div>
            </div>

            <div className='newsletter'  style={{ backgroundImage: `url(${office})` }}>
                <h3>Keep up with the latest news</h3>
                <p>Subscribe to our newsletter to stay updated on our services and offers.</p>
                <form>
                    <input type="email" placeholder="Your Email" required />
                    <button type="submit"><svg viewBox="0 0 100 60">
                        <path d="M25 30 L70 30 M70 30 L55 15 M70 30 L55 45"></path>
                    </svg></button>
                </form>
            </div>
        </>
    );
}




function Question({ nbr, question, answer }: { nbr: number; question: string; answer: string }) {
    const [active, setActive] = useState(false);
    return (
        <div
            className={`question${active ? ' active' : ''}`}
            onClick={() => setActive(!active)}
        >
            <h5>{String(nbr).padStart(2, '0')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{question}</h5>
            <p>{answer}</p>
        </div>
    );
}



export { Contact };