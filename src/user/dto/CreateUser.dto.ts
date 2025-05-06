import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength, ValidateIf } from "class-validator";
import { User } from "src/models/user.model";
import { IsUnique } from "src/validators/IsUnique.validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class ResponseCreateUserDto {
  @Exclude()
  password: string;
}
