import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../abstract.entity";

@Entity({name:'tbl_users'})
export class UserEntity extends AbstractEntity {


    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: 'varchar', length: 10 })
    birthdate: string;

    @Column({type:'boolean',default:false})
    blocked:boolean
}