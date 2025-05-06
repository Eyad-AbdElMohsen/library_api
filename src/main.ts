import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Sequelize } from "sequelize-typescript";
import { join } from "path";
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(new ValidationPipe( { transform: true, forbidNonWhitelisted: true }))
  // for custom validations
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); 

  const sequelize = app.get(Sequelize);
  await sequelize.sync();
  
  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error("Bootstrap error:", err);
});
