import { IsString } from 'class-validator';
export class CreateUserDto {
  // @IsString()
  // readonly name: string;
  @IsString()
  readonly email: string;
  // @IsString()
  // readonly address: string;
  // @IsString()
  // readonly streetAddress: string;
  @IsString()
  readonly password: string;
}
