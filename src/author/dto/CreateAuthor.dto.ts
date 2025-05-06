import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Author } from "src/models/author.model"
import { IsUnique } from "src/validators/IsUnique.validator"

export class CreateAuthorDto {
    @IsNotEmpty()
    @IsEmail()
    @IsUnique(Author)
    email: string

    @IsNotEmpty()       
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    name: string
}