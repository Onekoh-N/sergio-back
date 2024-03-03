import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Unidad } from 'src/schemas/unidad.entity';

@Entity()
export class Materia {
    @PrimaryGeneratedColumn()
    id: number    

    @Column({ unique: true, nullable: false })
    nombre: string;

    @Column({ nullable: false })
    descripcion: string;

    @Column()
    profesorId: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

    @ManyToOne(() => User) // Definiendo relación con el profesor
    profesor: User;

    @OneToMany(() => Unidad, unidad => unidad.materia) // Definiendo relación con las unidades
    unidades: Unidad[];
}

