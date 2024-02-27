import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthResDTO } from './dto/authRes.dto';
import { RespuestaDTO } from '../users/DTO/respuesta.DTO';
import { UserDTO } from '../users/DTO/user.DTO';

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UsersService,
        private readonly _jwtService: JwtService
    ) { }


    async login(userIn: LoginDTO): Promise<AuthResDTO> {
        let res: AuthResDTO;   
        const srchUser: RespuestaDTO = await this._usersService.findOneByEmail(userIn.email);
        if (!srchUser.success || !srchUser.userFound) {
            srchUser.message = 'Credenciales incorrectas';
            res = srchUser;
            throw new UnauthorizedException(res);
        }
        const usuarioEncontrado = srchUser.userFound;
        const validarPassword = await compare(userIn.password, usuarioEncontrado.password);
        if (!validarPassword) {
            res = {
                success: false,
                message: 'Credenciales incorrectas'
            }
            throw new UnauthorizedException(res);
        }
        const payload = {
            email: usuarioEncontrado.email,
            rol: usuarioEncontrado.rol
        };
        const token = await this._jwtService.signAsync(payload);
        res = {
            success: true,
            message: 'Login exitoso',
            token: token,
            userData: {
                email: usuarioEncontrado.email,
                rol: usuarioEncontrado.rol
            }
        }
        return res;

    }


    async register(user: UserDTO) {
        const respuesta: RespuestaDTO = await this._usersService.create(user);
        return respuesta;
    }

}
