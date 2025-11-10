import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType('LoginInput')
export class LoginDTO {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
