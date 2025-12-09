import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPhoneNumber, IsEmail, IsBoolean, Matches } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('ContactInput')
export class ContactDTO {
/**
 * GraphQL input for contact and newsletter submissions.
 */
    @IsString()
    @ApiProperty()
	/** Sender name. */
    @Field()
    name: string;

    @IsString()
    @ApiProperty()
	/** Company the sender represents. */
    @Field()
    company: string;

    @IsString()
    @ApiProperty()
	/** Sender country. */
    @Field()
    country: string;

    @Matches(/^[0-9+\-\s()]+$/, {
        message: 'Phone number format is invalid',
	/** Phone number for follow-up. */
    })
    @ApiProperty()
    @Field()
    phone: string;


    @IsEmail()

	/** Email address. */
    @ApiProperty()
    @Field({ nullable: false }) // Making email non-nullable
    email: string;

    @IsString()
	/** Type of company (e.g., agency, brand). */
    @ApiProperty()
    @Field()
    companyType: string;

    @IsString()
	/** Message body. */
    @ApiProperty()
    @Field()
    message: string;

    @IsBoolean()
	/** Consent to receive communications. */
    @ApiProperty()
    @Field()
    communications: boolean;

    @IsBoolean()
	/** Acceptance of privacy policy. */
    @ApiProperty()
    @Field()
    policy: boolean;

    @IsBoolean()
	/** Newsletter opt-in flag. */
    @ApiProperty()
    @Field()
    newsletter: boolean;
}
