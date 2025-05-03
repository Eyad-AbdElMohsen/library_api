import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function AuthorImageInterceptor() {
  return FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    }),
  });
}
