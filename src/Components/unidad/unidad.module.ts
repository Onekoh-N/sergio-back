import { Module } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from '../../schemas/materia.entity';
import { Unidad } from '../../schemas/unidad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unidad, Materia]), AuthModule],
  controllers: [UnidadController],
  providers: [UnidadService],
})
export class UnidadModule {}
