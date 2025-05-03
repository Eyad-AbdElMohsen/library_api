import { PartialType } from "@nestjs/mapped-types";
import { CreateBookDto } from "./CreateBook.dto";

export class UpdateBookDto extends PartialType(CreateBookDto){}