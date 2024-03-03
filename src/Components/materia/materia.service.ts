import { Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Materia } from '../../schemas/materia.entity';
import { ResModel } from 'src/utils/model/res.mode';
import { User } from '../../schemas/user.entity';
import { todo } from 'node:test';
import { Unidad } from 'src/schemas/unidad.entity';

@Injectable()
export class MateriaService {

  constructor(
    @InjectRepository(Materia) private readonly materiaRepository: Repository<Materia>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Unidad) private readonly unidadRepository: Repository<Unidad>
    ) {}

  // Crear Materia
  async create(createMateriaDto: CreateMateriaDto): Promise<ResModel> {    
    try {   
      const profesor = await this.usersRepository.findOne({where: {id: createMateriaDto.profesorId}});  
      if(!profesor) throw new Error('Profesor no encontrado');    
      const newMateria: Materia = this.materiaRepository.create(createMateriaDto);  
      const data: Materia = await this.materiaRepository.save(newMateria);
      const res: ResModel = {
        success: true,
        message: 'Materia creada exitosamente',
        data: data
      }
      return res;
    } catch (error) {
      const res: ResModel = {
        success: false,
        message: 'Error al crear la materia',
        error: error.message
      }
      return res;
    }
  }

  // Buscar todas las materias
  async findAll(): Promise<ResModel> {
    try {
      const data: Materia[] = await this.materiaRepository.find();  
      const res: ResModel = {
        success: true,
        message: 'Materias encontradas',        
        data: data
      }
      return res;
    } catch (error) {
      const res: ResModel = {
        success: false,
        message: 'Error al buscar las materias',
        error: error.message
      }
      return res;
    }
  }

  // Buscar una materia por ID
  async findOne(id: number): Promise<ResModel> {
    try {
      const data: Materia = await this.materiaRepository.findOneBy({id});
      if(!data) throw new Error('Materia no encontrada');
      const unidades: Unidad[] = await this.unidadRepository.findBy({materiaId: id});
      data.unidades = unidades;
      const res: ResModel = {
        success: true,
        message: 'Materia encontrada',
        data: data
      }
      return res;
    } catch (error) {
      const res: ResModel = {
        success: false,
        message: 'Error al buscar la materia',
        error: error.message
      }
      return res;
    }
  }

  // Actualizar una materia  
  async update(id: number, updateMateriaDto: UpdateMateriaDto): Promise<ResModel> {
    try {
      const data: UpdateResult = await this.materiaRepository.update(id, updateMateriaDto);
      if(!data.affected) throw new Error('Materia no encontrada');
      const updatedMateria = await this.materiaRepository.findOneBy({id});
      const res: ResModel = {
        success: true,
        message: 'Materia actualizada exitosamente',
        data: {
          "Datos Modificados": updatedMateria
        }
      }
      return res;
    } catch (error) {
      const res: ResModel = {
        success: false,
        message: 'Error al actualizar la materia',
        error: error.message
      }
      return res;
    }
  }

  // Eliminar una materia
  async remove(id: number): Promise<ResModel> {
    try {
      const data: DeleteResult  = await this.materiaRepository.delete(id);
      if(!data.affected) throw new Error('Materia no encontrada');
      const res: ResModel = {
        success: true,
        message: 'Materia eliminada exitosamente'
      }
      return res;
    } catch (error) {
      const res: ResModel = {
        success: false,
        message: 'Error al eliminar la materia',
        error: error.message
      }
      return res;
    }
  }
}
