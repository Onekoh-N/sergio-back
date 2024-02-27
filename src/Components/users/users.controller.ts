import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.entity';
import { UserDTO } from './DTO/user.DTO';
import { RespuestaDTO } from './DTO/respuesta.DTO';
import { UserUpdateDTO } from './DTO/userUpdate.DTO';
import { Auth } from '../../utils/decorators/auth.decorator';
import { Rol } from './roles/rol.enum'; 

@Controller()
export class UsersController {

    constructor(private readonly _usersService: UsersService) { }

    // Crear usuario
    @Post('user')
    @Auth(Rol.ADMIN)
    async create(@Res() res, @Body() userDTO: UserDTO) {
        const respuesta: RespuestaDTO = await this._usersService.create(userDTO);
        if(!respuesta.success){
            return res.status(HttpStatus.BAD_REQUEST).json(respuesta)
        }
        return res.status(HttpStatus.CREATED).json(respuesta)
    }

    // Listar todos los usuarios
    @Get('users')
    @Auth(Rol.USER)
    async getAll(@Res() res) {
        const usersList: User[] = await this._usersService.findAll();
        return res.status(200).json(usersList);
    }

    // Buscar un usuario
    @Get('user/:id')
    async findOne(@Res() res, @Param("id") id: number) {
        const respuesta: RespuestaDTO = await this._usersService.findOne(id);        
        return res.status(404).json(respuesta)        
    }

    // Editar usuario
    @Put('user/:id')
    async edit(@Res() res, @Param("id") id: number, @Body() userDTO: UserUpdateDTO) {

        const respuesta = await this._usersService.edit(id, userDTO);
        if(!respuesta.success){
            return res.status(404).json(respuesta)
        }
        return res.status(200).json(respuesta);
    }

    // Eliminar usuario
    @Delete('user/:id')
    async remove(@Res() res, @Param("id") id: number) {

        const respuesta = await this._usersService.remove(id);
        if(!respuesta.success){
            return res.status(404).json(respuesta)
        }
        return res.status(200).json(respuesta);

    }
}
