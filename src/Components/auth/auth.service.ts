import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResDTO } from './dto/authRes.dto';
import { UserResDTO } from '../users/DTO/UserRes.DTO';
import { UserDTO } from '../users/DTO/user.DTO';
import { compare} from 'bcryptjs';

import { ConfigService } from '@nestjs/config';
import { ResModel } from 'src/utils/model/res.mode';

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UsersService,
        private readonly _jwtService: JwtService,
        private configService: ConfigService
    ) { }

        //Login
    async login(login: LoginDTO): Promise<ResModel> {  
        try {
            const srchUser: ResModel = await this._usersService.findOneByEmail(login.email);            
            if(!srchUser.success) throw new UnauthorizedException(srchUser);                 
            const usuarioEncontrado = srchUser.data;
            const validarPassword = await compare(login.password, usuarioEncontrado.password);
            if (!validarPassword) throw new UnauthorizedException('Credenciales incorrectas');
            const payload = {
                email: usuarioEncontrado.email,
                rol: usuarioEncontrado.rol
            };            
            const token = await this._jwtService.sign(payload);
            const res: ResModel = {
                success: true,
                message: 'Login exitoso',
                data: {token: token,
                    userData: {
                        email: usuarioEncontrado.email,
                        rol: usuarioEncontrado.rol
                    }}
            }
            return res;
        } catch (error) {
            const res: ResModel = {
                success: false,
                message: 'Credenciales incorrectas',
            }
            return res;
        }

    }

        //Register
    async register(user: UserDTO) {
        const respuesta: UserResDTO = await this._usersService.create(user);
        return respuesta;
    }


}
