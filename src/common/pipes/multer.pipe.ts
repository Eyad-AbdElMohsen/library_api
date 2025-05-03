import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    const oneMb = 1024 * 1024;
    if(!value)
        return ''
    if(value.size > oneMb)
        throw new HttpException('File uploaded is too large. Maximum allowed size is 1MB.', HttpStatus.BAD_REQUEST);
    return value
  }
}