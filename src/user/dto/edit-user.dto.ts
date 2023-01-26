import { IsEmail, IsOptional, IsString } from 'class-validator';
export class EditUserDTO {
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsOptional()
  @IsString()
  lastName?: string;
}
