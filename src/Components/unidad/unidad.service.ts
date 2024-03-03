import { Injectable } from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidad } from '../../schemas/unidad.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ResModel } from 'src/utils/model/res.mode';
import { Materia } from 'src/schemas/materia.entity';

@Injectable()
export class UnidadService {

  constructor(
    @InjectRepository(Unidad) private readonly unidadRepository: Repository<Unidad>,
    @InjectRepository(Materia) private readonly materiaRepository: Repository<Materia>
    ) {}

  // Crear Unidad
  async create(createUnidadDto: CreateUnidadDto): Promise<ResModel> {
    try {  
      const materia = await this.materiaRepository.findOne({where: {id: createUnidadDto.materiaId}});
      if(!materia) throw new Error('Materia no encontrada');      
      const newUnidad: Unidad = this.unidadRepository.create(createUnidadDto);
      const data: Unidad = await this.unidadRepository.save(newUnidad);
      const res: ResModel = {
        success: true,
        message: 'Unidad creada exitosamente',
        data: data      
      } 
      return res;
    }catch (error) {
      const res: ResModel = {
        success: false,
        message: 'Error al crear la Unidad',
        error: error.message
      }
      return res;
    }
  }

  // Buscar todas las Unidades
  async findAll(): Promise<ResModel> {
    try {
      const data: Unidad[] = await this.unidadRepository.find();
      const res: ResModel = {
        success: true,
        message: 'Unidades encontradas',
        data: data
      }      
      return res;
    } catch (error) {
      const res: ResModel = {
        success: false,
        message: 'Error al buscar las Unidades',
        error: error.message
      }
      return res;
    }
  }

  // Buscar una Unidad por ID
  async findOne(id: number): Promise<ResModel> {  
    try {
      const data: Unidad = await this.unidadRepository.findOneBy({id});
      if(!data) throw new Error('Unidad no encontrada');
      const res: ResModel = {
        success: true,
        message: 'Unidad encontrada',
        data: data
      }
      return res;
    } catch (error) {
      const res = {
        success: false,
        message: 'Error al buscar la Unidad',
        error: error.message
      }
      return res;
    }
  }

  // Actualizar una Unidad
  async update(id: number, updateUnidadDto: UpdateUnidadDto): Promise<ResModel> {    
    try {      
      const unidad: Unidad = await this.unidadRepository.findOneBy({id});
      if(!unidad) throw new Error('Unidad no encontrada');
      const materia: Materia = await this.materiaRepository.findOne({where: {id: updateUnidadDto.materiaId}});
      if(!materia) throw new Error('Materia no encontrada');
      await this.unidadRepository.update(id, updateUnidadDto);      
      const data = await this.unidadRepository.findOneBy({id});
      const res: ResModel = {
        success: true,
        message: 'Unidad actualizada exitosamente',
        data: data
      }
      return res;
    }catch(error){
      const res: ResModel = {
        success: false,
        message: 'Error al actualizar la Unidad',
        error: error.message
      }
      return res;
    }
  }

  // Eliminar una Unidad
  async remove(id: number): Promise<ResModel> {
    try {
      const data: DeleteResult = await this.unidadRepository.delete(id);
      if(!data.affected) throw new Error('Unidad no encontrada');
      const res: ResModel = {
        success: true,
        message: 'Unidad eliminada exitosamente'
      }
      return res;
    }catch(error){
      const res: ResModel = {
        success: false,
        message: 'Error al eliminar la Unidad',
        error: error.message
      }
      return res;
    }
  }
}
