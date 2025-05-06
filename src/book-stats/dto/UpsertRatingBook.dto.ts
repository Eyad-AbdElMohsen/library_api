import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class UpsertRatingBookDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    rating: number
}