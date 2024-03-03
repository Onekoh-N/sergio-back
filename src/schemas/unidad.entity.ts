import { Materia } from "src/schemas/materia.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Unidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    materiaId: number;

    
    @Column()
    nombre: string;
    
    @Column({
        nullable: false,
        default: "Descripción de la Unidad",
    })
    descripcion: string;    

    @ManyToOne(() => Materia, materia => materia.unidades) // Definiendo relación con la materia
    materia: Materia;
}