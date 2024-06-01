import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CryptoConvert from 'crypto-convert';
import { CoinbaseCommerceService } from '../services/coinbase-commerce.service';
import { MerchantService } from './merchant.service';
import { CryptoConvertService } from './crypto-convert.service';
import { Settlement } from '../entities/settlement.entity';



@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Settlement)
        private  settlementRepository: Repository<Settlement>,
        private readonly coinbaseService: CoinbaseCommerceService,
        private readonly merchantService: MerchantService,
        private readonly cryptoConvertService: CryptoConvertService,
    ) {}

    async initiateCryptoPayment(amount: number, currency: string, merchantId: string): Promise<any> {

        try {
            //const coinbase = this.coinbaseService.getCoinbaseClient();
            const chargeData = {
                name: 'IvoryPay payment order',
                description: 'Payment for services',
                local_price: {
                    amount: amount,
                    currency: currency.toUpperCase(),
                },
                pricing_type: 'fixed_price',
                metadata: {
                    merchant_id: merchantId.toString(),
                },
            };
            const charge = await this.coinbaseService.createCharge(chargeData);

            if (charge && charge.id) {
                const retrievedCharge = await this.coinbaseService.retrieveCharge(charge.id);
                return retrievedCharge;
            }
        } catch (error) {
            throw new Error('Failed to initiate the payment: ${error.message}');
        }
    }

    async retrievePaymentDetails(chargeId: string): Promise<any> {
        try {
            const charge = await this.coinbaseService.retrieveCharge(chargeId);
            return charge;
        } catch (error) {
            console.error('Failed to retrieve payment details:', error);
            throw new Error(`Failed to retrieve the payment details" ${error.message}`);
        }
    }

    async settlePayment(amount: number, cryptoCurrency: string, fiatCurrency: string, merchantId: number): Promise<string> {
        const convert = new CryptoConvert();
        await convert.ready();

        try {
            // we convert to FIAT. We can change to USD|JPY|EUR etc..
            const convertedAmount = await convert[cryptoCurrency][fiatCurrency](amount);
            //const convertedAmount = await this.cryptoConvertService.convertCryptoToFiat(amount,cryptoCurrency, fiatCurrency);
            
            // Save settlement history
            const settlement = new Settlement({
                cryptoCurrency,
                fiatCurrency,
                amount,
                convertedAmount,
                merchantId,
                settledAt: new Date()
            }); 
            await this.settlementRepository.save(settlement);
            
            // Credit merchant acc using the merchant_id
            await this.merchantService.updateAccountBal(merchantId, convertedAmount);

            return `Successfully settled ${amount}, ${cryptoCurrency} to ${fiatCurrency}:(${convertedAmount}) to merchant ID: ${merchantId}.`;
        } catch (error) {
            console.error(`Failed to settle payment: ${error.message}`);
            throw new Error(`Failed to settle payment: ${error.message}`);
        }
    }

    async processPaymentConfirmation(webhookData: any): Promise<string> {
        try {
            // we extract the data from webhookData (chargeID, paymentstatus, amount, merchantId)
            const { event, data } = webhookData;
            const chargeId = data.id;
            const paymentStatus = data.timeline[data.timeline.length - 1].status;
            const amount = data.pricing.local.amount;
            const merchantId = data.metadata.merchant_id;

            // For the demo purpose we pick -successful payment | Update the merchant acc balance
            if (event === 'charge:confirmed' && paymentStatus === 'COMPLETED') {
                await this.merchantService.updateAccountBal(merchantId, amount);
                return `Payment of ${amount} confirmed and settled for merchant ${merchantId}.`;
            } else {
                // for the rest of the other status, we don't do anything at the moment
                return `Payment event: ${event}, status: ${paymentStatus}. No action taken at the moment.`;
            }
        } catch (error) {
            console.error(`Failed to process the payment confirmation: ${error.message}`);
            throw new Error(`Failed to process payment confirmation: ${error.message}`);
        }
    }

    
}
