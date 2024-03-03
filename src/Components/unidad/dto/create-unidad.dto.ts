import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateUnidadDto {
    @IsNumber()
    materiaId: number;

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @MinLength(3)
    descripcion: string;
}
