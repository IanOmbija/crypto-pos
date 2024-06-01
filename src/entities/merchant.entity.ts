import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Settlement } from "./settlement.entity";

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 0})
    accountBalance: number;
    createdAt: Date;
    updatedAt: Date;

    @OneToMany(() => Settlement, settlement => settlement.merchant)
    settlements: Settlement[];

    constructor(partial: Partial<Merchant>) {
        Object.assign(this, partial);
    }
}