import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { encriptString } from '../../utils/encript';
import { User } from 'src/schemas/user.entity';
import { UserDTO } from './DTO/user.DTO';
import { RespuestaDTO } from './DTO/respuesta.DTO';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    //Crear usuario
    async create(user: UserDTO): Promise<RespuestaDTO> {
        try {
            user.password = await encriptString(user.password);
            const newUser = await this.usersRepository.save(user);
            const respuesta = {
                success: true,
                message: 'Usuario creado exitosamente',
                createdUser: {
                    'user': newUser.username,
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
    //Buscar un usuario
    findOne(id: number): Promise<User | null> {
        try {
            return this.usersRepository.findOneBy({ id });
        } catch (error) {
            return null;
        }
    }
    //Editar usuario
    async edit(id: number, user: UserDTO): Promise<RespuestaDTO> {
        try {
            await this.usersRepository.update(id, user);
            const userUpdated = await this.usersRepository.findOneBy({ id });
            if (!userUpdated) {
                throw new Error('Usuario no encontrado');
            }
            const respuesta: RespuestaDTO = {
                success: true,
                message: 'Usuario actualizado exitosamente',
                updatedUser: user
            }
            return respuesta;
        } catch (error) {
            const respuesta: RespuestaDTO = {
                success: false,
                message: 'Error al actualizar el usuario',
                error: error.message
            }
            return respuesta;
        }
    }

    //Eliminar usuario
    async remove(id: number): Promise<RespuestaDTO> {

        const deletedUser = await this.usersRepository.delete(id);
        console.log(deletedUser);

        if (deletedUser.affected === 0) {
            const respuesta: RespuestaDTO = {
                success: false,
                message: 'Usuario eliminado exitosamente',
                error: 'Usuario no encontrado'
            }
            return respuesta;
        }
        const respuesta: RespuestaDTO = {
            success: true,
            message: 'Usuario eliminado exitosamente'
        }
        return respuesta;
    }
}