import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './Components/users/users.module';
import { CursosModule } from './Components/cursos/cursos.module';
import { User } from './schemas/user.entity';
import { AuthModule } from './Components/auth/auth.module';


@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    entities: [User],
    synchronize: true,
  }),
    UsersModule,
    AuthModule,
    CursosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
