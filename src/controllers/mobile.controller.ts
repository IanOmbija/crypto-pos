import { Controller, Get, Post, Body } from '@nestjs/common';
import { CryptoConvertService } from 'src/services/crypto-convert.service';
import { PaymentService } from 'src/services/payment.service';

@Controller('api/mobile')
export class MobileController {
    constructor(
        private readonly cryptoConvertService: CryptoConvertService,
        private readonly paymentService: PaymentService,
    ) {}

    @Get('exchange-rates')
    async getExchangeRates() {
        return this.cryptoConvertService.getExchangeRates();
    }
}
