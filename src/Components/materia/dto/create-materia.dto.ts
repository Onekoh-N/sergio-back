import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateMateriaDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    descripcion: string;

    @IsNumber()    
    profesorId: number;
}
