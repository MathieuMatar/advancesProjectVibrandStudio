import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { ContactDTO } from './dto/ContactDTO';
import { Public } from 'src/auth/public.decorator';

/**
 * GraphQL resolver exposing newsletter signup and contact mutations.
 */
@Resolver()
export class MailResolver {
	constructor(private readonly mailService: MailService) { }

	/**
	 * Adds a subscriber to the newsletter.
	 */
	@Mutation(() => Boolean)
	@Public()
	async joinNewsletter(@Args('email') email: string): Promise<boolean> {
		return this.mailService.joinNewsletter(email);
	}

	/**
	 * Sends a contact message and acknowledgement email.
	 */
	@Mutation(() => Boolean)
	@Public()
	async contactUs(@Args('input') input: ContactDTO): Promise<boolean> {
		return this.mailService.contactUs(input);
	}
}
