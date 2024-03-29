import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from '../users/DTO/user.DTO';
import { UserResDTO } from '../users/DTO/UserRes.DTO';
import { ResModel } from 'src/utils/model/res.mode';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) { }

    //Login
    @Post('login')
    async login(@Body() registerDTO: LoginDTO, @Res() res): Promise<ResModel> {
        const loginResp: ResModel = await this._authService.login(registerDTO);
        if(!loginResp.success){
            return res.status(HttpStatus.UNAUTHORIZED).json(loginResp);
        }
        return res.status(HttpStatus.OK).json(loginResp);      
    }


    //Register
    @Post('register')
    async register(@Res() res, @Body() registerDTO: UserDTO): Promise<UserResDTO> {
        
            const authResp = await this._authService.register(registerDTO);
            if(!authResp.success){
                return res.status(HttpStatus.BAD_REQUEST).json(authResp);
            }
            return res.status(HttpStatus.CREATED).json(authResp);
        
    }


}
