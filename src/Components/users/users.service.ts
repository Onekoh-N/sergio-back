import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { encriptString } from '../../utils/encript';
import { User } from 'src/schemas/user.entity';
import { UserDTO } from './DTO/user.DTO';
import { UserResDTO } from './DTO/UserRes.DTO';
import { ResModel } from 'src/utils/model/res.mode';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    //Crear usuario
    async create(user: UserDTO): Promise<UserResDTO> {
        try {
            user.password = await encriptString(user.password);
            const newUser = await this.usersRepository.save(user);
            const respuesta = {
                success: true,
                message: 'Usuario creado exitosamente',
                createdUser: {
                    'id': newUser.id,
                    'email': newUser.email,
                    'rol': newUser.rol
                }
            }
            return respuesta;
        } catch (error) {
            const respuesta = {
                success: false,
                message: 'Error al crear el usuario',
                error: error.message
            }
            return respuesta;
        }
    }

    //Listar todos los usuarios
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    //Buscar Por ID
    async findOne(id: number): Promise<UserResDTO> {
        try {
            const user = await this.usersRepository.findOneBy({ id });
            const respuesta: UserResDTO = {
                success: true,
                message: 'Usuario encontrado',
                userFound: user
            }
            return respuesta;
        } catch (error) {
            const respuesta = {
                success: false,
                message: 'Error al buscar el usuario',
                error: error.message
            }
            return respuesta;
        }
    }

    //Buscar Por Email
    async findOneByEmail(email: string): Promise<ResModel> {
        try {
            const user = await this.usersRepository.findOneBy({ email });
            if (!user) throw new Error('Usuario no encontrado');
            
            const res: ResModel = {
                success: true,
                message: 'Usuario encontrado',
                data: user
            }
            return res;
        } catch (error) {
            const res : ResModel = {
                success: false,
                message: 'Error al buscar el usuario',
                error: error.message
            }
            return res;
        }
    }

    //Editar usuario
    async edit(id: number, user: UserDTO): Promise<UserResDTO> {
        try {
            await this.usersRepository.update(id, user);
            const userUpdated = await this.usersRepository.findOneBy({ id });
            if (!userUpdated) {
                throw new Error('Usuario no encontrado');
            }
            const respuesta: UserResDTO = {
                success: true,
                message: 'Usuario actualizado exitosamente',
                updatedUser: user
            }
            return respuesta;
        } catch (error) {
            const respuesta: UserResDTO = {
                success: false,
                message: 'Error al actualizar el usuario',
                error: error.message
            }
            return respuesta;
        }
    }

    //Eliminar usuario
    async remove(id: number): Promise<ResModel> {
        try {
            const deletedUser = await this.usersRepository.delete(id);
            if(!deletedUser.affected) throw new Error('Usuario no encontrado');            
            const res: ResModel = {
                success: true,
                message: 'Usuario eliminado exitosamente'
            }
            return res;
        } catch (error) {
            const res: ResModel = {
                success: false,
                message: 'Error al eliminar el usuario',
                error: error.message                
            }
            return res;
        }
    }
}