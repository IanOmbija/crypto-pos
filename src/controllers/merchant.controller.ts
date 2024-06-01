import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MerchantService } from 'src/services/merchant.service';
import { Merchant } from 'src/entities/merchant.entity';
import { Settlement } from 'src/entities/settlement.entity';

@Controller('api/merchant')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) {}

    //create merchant
    @Post('create-merchant')
    async createMerchant(@Body('name') name: string): Promise<Merchant> {
        return await this.merchantService.registerMerchant(name);
    }

    //fetch specific merchant with ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Merchant | undefined> {
        return this.merchantService.getMerchantById(id);
    }

    // get all the merchants
    @Get()
    async findAll(): Promise<Merchant[]> {
        return await this.merchantService.getAllMerchants();
    }

    // get settlement merchant's history
    @Get(':id/settlement-history')
    async getSettlementHistory(@Param('id') id: string): Promise<Settlement[]> {
        const merchantId = parseInt(id, 10);
        return this.merchantService.getSettlementHistory(merchantId);
    }
}
