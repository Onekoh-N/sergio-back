import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Rol } from '../Components/users/roles/rol.enum';
import { Materia } from './materia.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: Rol,
        default: Rol.ALUM
    })
    rol: Rol;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaExpiracion: Date;

    @OneToMany(() => Materia, materia => materia.profesor) // Definiendo relación con las materias que imparte
    materias: Materia[];
}