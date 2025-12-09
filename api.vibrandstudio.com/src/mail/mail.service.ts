import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactDTO } from './dto/ContactDTO';
import ejs, { name, render } from 'ejs';
import path from 'path';
import nodemailer from "nodemailer";
import { text } from 'stream/consumers';

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT),
	secure: true,             // use SSL
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	}
});

/**
 * Handles outbound transactional emails and newsletter subscriptions.
 */
@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name);

	constructor(private config: ConfigService) { }

	/**
	 * Sends a newsletter welcome email to the provided address.
	 * @param email Subscriber email address.
	 */
	async joinNewsletter(email: string): Promise<boolean> {
		console.log(`joinNewsletter called with email: ${email}`);

		// Use relative path from the current file
		const templatePath = path.join(__dirname, "templates", "newsletter.ejs");

		const html = await ejs.renderFile(templatePath, { email });
		console.log(html);

		const mailOptions = {
			from: process.env.MAIL_USER, 
			to: [email, process.env.MAIL_USER],
			subject: "Thank you for joining our newsletter!",
			html: html,
			text: `Thank you for joining our newsletter ! \n ${email} \n Vibrand Studio. \n Visit us at: https://vibrandstudio.com`
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log("Error sending email:", error);
				return false;
			} else {
				console.log("Email sent:", info.response);
			}
		});
		return true;
	}

	/**
	 * Sends contact form details to internal mailbox and confirmation to user.
	 * @param input Contact form payload.
	 */
	async contactUs(input: ContactDTO): Promise<boolean> {
		console.log(`contactUs called with input: ${JSON.stringify(input)}`);
		const templatePath = path.join(__dirname, "templates", "contact.ejs");

		const html = await ejs.renderFile(templatePath, { input });
		console.log(html)

		const infoTemplate = path.join(__dirname, "templates", "info.ejs");
		const infoHtml = await ejs.renderFile(infoTemplate, { input });
		console.log(infoHtml)

		const mailOptions = {
			from: process.env.MAIL_USER,
			to: [process.env.MAIL_USER],
			subject: "New Contact Form Submission",
			html: infoHtml,
			text: `New contact form submission from ${input.name} (${input.email}).`
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log("Error sending email:", error);
				return false;
			} else {
				console.log("Email sent:", info.response);
			}
		});

		const userMailOptions = {
			from: process.env.MAIL_USER,
			to: [input.email],
			subject: "Thank you for contacting Vibrand Studio",
			html: html,
			text: `Thank you for contacting Vibrand Studio, ${input.name}. We have received your message and will get back to you shortly.`
		};

		transporter.sendMail(userMailOptions, (error, info) => {
			if (error) {
				console.log("Error sending email to user:", error);
				return false;
			} else {
				console.log("User email sent:", info.response);
			}
		});

		return true;
	}

}
