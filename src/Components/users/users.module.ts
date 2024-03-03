import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../schemas/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Materia, } from 'src/schemas/materia.entity';
import { Unidad } from '../../schemas/unidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Materia, Unidad]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
