import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateAuthorDto } from "./CreateAuthor.dto";

// take only name from "CreateAuthorDto" and make it optional 
export class UpdateAuthorDto extends 
PartialType(
    PickType(CreateAuthorDto, ['name'])
){}