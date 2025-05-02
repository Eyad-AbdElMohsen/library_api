import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from "./models/user.model";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from "./user/user.repository";
import { UserModule } from "./user/user.module";
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access env variables
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres', // Specify your dialect
        uri: configService.get('DATABASE_URL'), // Get the DATABASE_URL from the .env file
        autoLoadModels: true,
        synchronize: true,
        models: [User]
      }),
    }),
    AuthModule,
    UserModule,
    AuthorModule
  ]
})
export class AppModule {}
