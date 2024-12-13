import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, nullable: true })
    firstname: string;

    @Column({ length: 100, nullable: true})
    lastname: string;
}
