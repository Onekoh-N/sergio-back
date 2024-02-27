
import { IsString, IsEmail, MinLength, Validate } from "class-validator";
import { NoWhitespace } from "../../../utils/decorators/noWithespace.decorator";

export  class LoginDTO {
    @IsEmail()
    @Validate(NoWhitespace, { message: 'El correo no puede contener espacios en Blanco' })
    @IsString()    
    readonly email: string;

    @Validate(NoWhitespace, { message: 'La contraseña no puede contener espacios en blanco' })
    @IsString()    
    readonly password: string;
}