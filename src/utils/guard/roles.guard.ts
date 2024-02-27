// Este guardia se utiliza para proteger las rutas que requieren roles específicos de usuario.
// Comprueba si el rol del usuario en la petición coincide con el rol especificado en el decorador.


import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol } from '../../Components/users/roles/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate { 
  constructor(private readonly _reflector: Reflector){} //El Reflector se utiliza para obtener metadatos y decoradores de los controladores y métodos.
  

  canActivate(context: ExecutionContext): boolean{                     // Método que se llama automáticamente para determinar si un usuario tiene permiso para acceder a una ruta.       
      const rolDecorador = this._reflector.getAllAndOverride<Rol>(process.env.ROLES_KEY, [  // Obtiene el rol especificado en el decorador del controlador o método.
      context.getHandler(),
      context.getClass(),
    ])
    if(!rolDecorador){                                                  // Si no se especifica un rol en el decorador, se permite el acceso por defecto.
      return true;
    }
    const {user} = context.switchToHttp().getRequest();                   //Obtiene el usuario de la peticion
    const rolUsuario = user.rol;
    if(rolDecorador === rolUsuario) {
      return true
    }else{
      throw new UnauthorizedException('No tiene permiso para acceder a esta ruta');
    };                         // Luego, compara este rol con el rol del usuario en la solicitud para determinar si tienen acceso.
  
    
  
  }
}
