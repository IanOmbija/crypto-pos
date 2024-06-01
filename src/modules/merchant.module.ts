import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from 'src/entities/merchant.entity';
import { MerchantService } from 'src/services/merchant.service';
import { MerchantController } from 'src/controllers/merchant.controller';
import { Settlement } from 'src/entities/settlement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Merchant, Settlement])],
    providers: [MerchantService],
    controllers: [MerchantController],
    exports: [MerchantService],
})
export class MerchantModule {}
