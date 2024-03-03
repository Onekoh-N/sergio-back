import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './Components/users/users.module';
import { User } from './schemas/user.entity';
import { AuthModule } from './Components/auth/auth.module';
import { Materia } from './schemas/materia.entity';
import { MateriaModule } from './components/materia/materia.module';
import { UnidadModule } from './components/unidad/unidad.module';
import { Unidad } from './schemas/unidad.entity';


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
    entities: [User, Materia, Unidad],
    synchronize: true,
    autoLoadEntities: true
  }),
    UsersModule,
    AuthModule,
    MateriaModule,
    UnidadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
