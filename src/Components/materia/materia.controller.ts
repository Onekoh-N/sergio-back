import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Auth } from 'src/utils/decorators/auth.decorator';
import { Rol } from '../users/roles/rol.enum';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  // Crear Materia
  @Post()
  @Auth([Rol.PROFE])
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiaService.create(createMateriaDto);
  }

  // Buscar todas las materias
  @Get()
  @Auth([Rol.PROFE])
  findAll() {
    return this.materiaService.findAll();
  }

  // Buscar una materia por ID
  @Get(':id')
  @Auth([Rol.PROFE])
  findOne(@Param('id') id: string) {
    return this.materiaService.findOne(+id);
  }

  // Actualizar una materia
  @Patch(':id')
  @Auth([Rol.PROFE])
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(+id, updateMateriaDto);
  }

  @Delete(':id')
  @Auth([Rol.PROFE])
  remove(@Param('id') id: string) {
    return this.materiaService.remove(+id);
  }
}
