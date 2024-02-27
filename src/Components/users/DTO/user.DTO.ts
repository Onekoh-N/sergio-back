import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString, MinLength, Validate } from "class-validator";
import { Rol } from "../roles/rol.enum";
import { NoWhitespace } from "../../../utils/decorators/noWithespace.decorator";
export class UserDTO {
    @IsEmail()
    @MinLength(5)
    email?: string;

    @IsString()
    @MinLength(3)
    @Validate(NoWhitespace, { message: 'El usuario no puede contener espacios en blanco' })
    username?: string;

    @IsString()
    @MinLength(3)
    @Validate(NoWhitespace, { message: 'La contraseña no puede contener espacios en blanco' })
    password?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsBoolean()    
    @IsOptional()
    isActive?: boolean;    

    @IsEnum(Rol)
    @IsOptional()
    rol?: Rol;

    @IsDate()
    @IsOptional()
    fechaCreacion?: Date;

    @IsDate()
    @IsOptional()
    fechaActualizacion?: Date;

    @IsDate()
    @IsOptional()
    fechaExpiracion?: Date;
}