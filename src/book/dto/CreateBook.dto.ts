import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator"
import { Author } from "src/models/author.model"
import { Book } from "src/models/book.model"
import { IsUnique } from "src/validators/IsUnique.validator"
import { IsExistInDB } from "src/validators/IsInDB.validator"

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    @IsUnique(Book)
    title: string

    @IsNotEmpty()
    @IsEnum(['Fiction', 'Historical', 'Horror'])
    category: string

    @IsDateString()
    @IsOptional()
    publishedYear: string

    @IsExistInDB(Author)
    @IsNotEmpty()
    @Type(() => Number) // try convert it to number first 
    @IsNumber()
    @IsPositive()
    authorId: number
    //note!: if the body { authorId: } -> it will be 0 because of  @Type(() => Number)
}