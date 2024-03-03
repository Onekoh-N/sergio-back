import { IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class UpdateMateriaDto{
    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsNumber()    
    @IsOptional()    
    profesorId?: number;
}
