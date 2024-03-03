import { IsBoolean, IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength, Validate } from "class-validator";
import { Rol } from "../roles/rol.enum";
import { NoWhitespace } from "../../../utils/decorators/noWithespace.decorator";
import { Materia } from "src/schemas/materia.entity";
export class UserDTO {
    @IsNumber()    
    @IsOptional()
    id?: number;

    @IsEmail()
    @MinLength(5)
    email?: string;

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

    @IsOptional()    
    materias?: Materia[];

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