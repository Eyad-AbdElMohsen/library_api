import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from "./models/user.model";
import { AuthModule } from './auth/auth.module';
import { UserModule } from "./user/user.module";
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { BookStatsModule } from './book-stats/book-stats.module';

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
        sync: { alter: true },
        models: [User]
      }),
    }),
    AuthModule,
    UserModule,
    AuthorModule,
    BookModule,
    BookStatsModule
  ]
})
export class AppModule {}
