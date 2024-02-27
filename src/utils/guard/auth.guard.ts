import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {} //Injection de dependencias
  async canActivate(context: ExecutionContext): Promise<boolean> { //Funcion que retorna un booleano    
    const request = context.switchToHttp().getRequest();        //Obtiene la peticion      
      const token = this.extractTokenFromHeader(request);         //Obtiene el token
      if(!token){throw new UnauthorizedException("Debe Estar logueado para realizar esta accion");}  //Si no hay token lanza una excepcion
      try {
      const payload = await this._jwtService.verifyAsync(token);  //Verifica el token
      request.user = payload;                          //Guarda el "payload" en la peticion con el nombre "user"
    } catch {
      throw new UnauthorizedException("No tiene permiso para realizar esta accion");
    }
    return true;                                          //Retorna true si el token es valido
  }

  private  extractTokenFromHeader(request): string | undefined {            //Funcion para extraer el token
    const [type, token] = request.headers.authorization?.split(' ') ?? [];  //Obtiene el token y el tipo de token
    return type === 'Bearer' ? token : undefined;                           //Retorna el token si el tipo de token es Bearer
  }                                                                          //Retorna undefined si el tipo de token no es Bearer  
}
