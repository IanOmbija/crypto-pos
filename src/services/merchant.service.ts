import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from 'src/entities/merchant.entity';
import { Settlement } from 'src/entities/settlement.entity';

@Injectable()
export class MerchantService {
    private readonly merchants: Merchant[] = [];
    constructor(
        @InjectRepository(Merchant)
        private  merchantRepository: Repository<Merchant>,
        @InjectRepository(Settlement)
        private  settlementRepository: Repository<Settlement>,
        
    ) {}

    async registerMerchant(name: string): Promise<Merchant> {
        const merchant = new Merchant({
            name, 
            accountBalance: 0,
            createdAt: new Date(),
            updatedAt: new Date()});
           
            return await this.merchantRepository.save(merchant);
        
    }

    async updateAccountBal(merchantId: number, amount: number): Promise<Merchant | { error: string }> {
        try{
            const merchant = await this.merchantRepository.findOne({where: {id: merchantId}});
            if(merchant) {
                merchant.accountBalance += amount;
                return await this.merchantRepository.save(merchant);
            } else {
              return { error: `Merchant with ID ${merchantId} not found.`};  
            }
        } catch (error) {
            console.error(`Failed to update account balance for merchant ID ${merchantId}: ${error.message}`);
            throw new Error(`Failed to update account balance for merchant ID ${merchantId}`);
        }
      
    }

    async getMerchantById(id: number): Promise<Merchant | undefined> {
        try {
            const merchant = await this.merchantRepository.findOneBy({ id });
            if (!merchant) {
                throw new NotFoundException(`Merchant with ID ${id} not found`);
            }
            console.log('Fetched merchant:', merchant); 
            return merchant;
        } catch (error) {
            console.error(`Failed to find merchant with ID ${id}: ${error.message}`);
            throw new Error(`Failed to find merchant with ID ${id}`);
        }
    }

    async getAllMerchants(): Promise<Merchant[]> {
        try {
            return await this.merchantRepository.find();
        } catch (error) {
            console.error(`Failed to fetch all merchants: ${error.message}`);
            throw new Error(`Failed to fetch all merchants`);
        }
    }

    async getSettlementHistory(merchantId: number): Promise<Settlement[]> {
        try {
            return await this.settlementRepository.find({ where: {merchant: { id: merchantId }}});
        } catch (error) {
            console.error(`Failed to retrieve settlement history for merchant ID:${merchantId} with error: ${error.message}`);
            throw new Error(`Failed to retrieve settlement history for merchant ID:${merchantId} with error: ${error.message}`);
        }
    }
}
