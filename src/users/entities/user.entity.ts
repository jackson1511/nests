import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, nullable: true })
    firstname: string;

    @Column({ length: 100, nullable: true})
    lastname: string;

    @Column({length: 100, nullable: true})
    email: string

    @Column({length: 255, nullable: true})
    password: string

    @Column({ type: 'text' })
    roles: Role[]
}
