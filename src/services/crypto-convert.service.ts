import { Injectable } from '@nestjs/common';
import CryptoConvert from 'crypto-convert';

@Injectable()
export class CryptoConvertService {
    private readonly convert: any;

    constructor() {
        this.convert = new CryptoConvert();
    }

    async convertCryptoToFiat(amount: number, cryptoCurrency: string, fiatCurrency: string): Promise<number> {
        try {
            // we await the inital cache to load
            await this.convert.ready();
            return this.convert[cryptoCurrency][fiatCurrency](amount);
        } catch (error) {
            console.error('Failed to convert crypto to fiat:', error.message);
            throw new Error('Failed to convert crypto to fiat');
        }
    }

    async getExchangeRates(): Promise<any> {
        try {
            // wait cache load
            await this.convert.ready();

            // fetch exchang rates
            /* Note we can enhance this further
                to allow us pass `amount` as an argument and get the rates
            */
            const BTC_USD = this.convert.BTC.USD(1);
            const ETH_USD = this.convert.ETH.USD(1);
            const BTC_JPY = this.convert.BTC.JPY(1);
            const ETH_JPY = this.convert.ETH.JPY(1);
            
            return { message: 'These are the conversion rates of 1:1 ratio:',
                BTC_USD,
                ETH_USD,
                BTC_JPY,
                ETH_JPY
               
            }
        } catch (error) {
            console.error('Failed to fetch the exchange rates:', error.message);
            throw new Error('Failed to fetch the exchange rates');
        }
    }
}
