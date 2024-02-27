import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResDTO } from './dto/authRes.dto';
import { RespuestaDTO } from '../users/DTO/respuesta.DTO';
import { UserDTO } from '../users/DTO/user.DTO';
import { compare} from 'bcryptjs';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UsersService,
        private readonly _jwtService: JwtService,
        private configService: ConfigService
    ) { }

        //Login
    async login(login: LoginDTO): Promise<AuthResDTO> {
        let res: AuthResDTO;   
        const srchUser: RespuestaDTO = await this._usersService.findOneByEmail(login.email);
        if (!srchUser.success || !srchUser.userFound) {
            srchUser.message = 'Credenciales incorrectas';
            res = srchUser;
            throw new UnauthorizedException(res);
        }
        const usuarioEncontrado = srchUser.userFound;
        const validarPassword = await compare(login.password, usuarioEncontrado.password);
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
        
        const token = await this._jwtService.sign(payload);
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

        //Register
    async register(user: UserDTO) {
        const respuesta: RespuestaDTO = await this._usersService.create(user);
        return respuesta;
    }


}
