import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpassword',
      database: 'nestjs_db',
      entities: [User],
      // autoLoadEntities: true,
      synchronize: true, // for development purpose
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
