import { Controller , Get, Param, ParseIntPipe} from '@nestjs/common';
import { CryptoConvertService } from '../services/crypto-convert.service';

@Controller('api/crypto-convert')
export class CryptoConvertController {
    constructor(private readonly cryptoConvertService: CryptoConvertService) {}

    @Get('convert-to-fiat/:amount/:cryptoCurrency/:fiatCurrency')
    async convertCryptoToFiat(
        @Param('amount', ParseIntPipe) amount: number,
        @Param('cryptoCurrency') cryptoCurrency: string,
        @Param('fiatCurrency') fiatCurrency: string,
    ): Promise<number> {
        return this.cryptoConvertService.convertCryptoToFiat(amount, cryptoCurrency, fiatCurrency);
    }
}
