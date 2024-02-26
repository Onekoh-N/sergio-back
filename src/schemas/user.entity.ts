import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from '../Components/users/roles/rol.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ unique: true, nullable: false })
    username: string;

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
        default: Rol.USER
    })
    rol: Rol;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaExpiracion: Date;

}