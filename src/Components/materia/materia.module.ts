import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from '../../schemas/materia.entity';
import { User } from '../../schemas/user.entity';
import { UsersService } from '../users/users.service';
import { Unidad } from 'src/schemas/unidad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Materia, User, Unidad]), AuthModule],
  controllers: [MateriaController],
  providers: [MateriaService, UsersService],
})
export class MateriaModule {}
