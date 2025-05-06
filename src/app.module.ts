import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from "./models/user.model";
import { AuthModule } from './auth/auth.module';
import { UserModule } from "./user/user.module";
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { BookStatsModule } from './book-stats/book-stats.module';
import { FavouriteModule } from './favourite/favourite.module';
import { OwnedBookModule } from './owned-book/owned-book.module';
import { Book } from "./models/book.model";
import { BookStats } from "./models/book-stats.model";
import { Favourite } from "./models/favourite.model";
import { OwnedBook } from "./models/ownedBook.model";
import { Author } from "./models/author.model";

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
        models: [User, Book, BookStats, Favourite, OwnedBook, Author]
      }),
    }),
    AuthModule,
    UserModule,
    AuthorModule,
    BookModule,
    BookStatsModule,
    FavouriteModule,
    OwnedBookModule,
  ]
})
export class AppModule {}
