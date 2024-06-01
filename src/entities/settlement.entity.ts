import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Merchant } from "./merchant.entity";

@Entity()
export class Settlement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    convertedAmount: number;

    @Column()
    cryptoCurrency: string;

    @Column()
    fiatCurrency: string;

    @Column()
    merchantId: number;

    @Column()
    settledAt: Date;

    @ManyToOne(() => Merchant, merchant => merchant.settlements)
    @JoinColumn({ name: 'merchantId'})
    merchant: Merchant;

    constructor(partial: Partial<Settlement>){
        Object.assign(this, partial);
    }
}