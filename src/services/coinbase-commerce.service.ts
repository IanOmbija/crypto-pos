import { Injectable } from '@nestjs/common';
import * as coinbase from 'coinbase-commerce-node';

const Client = coinbase.Client;
////const ChargeR = coinbase.resources.Event.retrieve;
const {Charge}  = coinbase.resources

@Injectable()
export class CoinbaseCommerceService {
    private readonly coinbaseClient: any;
    private readonly webhookSecret: string = process.env.COINBASE_WEBHOOK_SECRET || '';

    constructor(){
       const apiKey = process.env.COINBASE_API_KEY;
       //console.log(apiKey);
        //this.coinbaseClient = coinbase;
      if (!apiKey) {
        throw new Error ('Coinbase API Key not found in .env');
      }

      coinbase.Client.init(apiKey);
      this.coinbaseClient = Client;
        
    }

    getCoinbaseClient(): typeof Client {
        return this.coinbaseClient;
    }

    async createCharge(chargeData: any): Promise<any> {
        try {
            const charge = await Charge.create(chargeData);
            
            console.log('IvoryPay Charge Created: ', charge);
            console.log(charge);
            return charge;
        } catch (error) {
            console.error('Failed to create the charge:', error);
            throw new Error(`Failed to create charge: ${error.message}`);
        }
    }

    async retrieveCharge(chargeId: string): Promise<any> {
        try {
            const charge = await coinbase.resources.Charge.retrieve(chargeId);
            console.log('Retrieved charge successfully: ', charge);
            console.log(charge);
            return charge;
        } catch (error) {
            console.error('Failed to retrieve the charge', error);
            throw new Error(`Failed to retrieve charge: ${error.message}`);
        }
    }

    async verifyWebhookSignature(rawBody: string, signature: string): Promise<boolean> {
        try {
            coinbase.Webhook.verifySigHeader(rawBody, signature, this.webhookSecret);
            console.log('Webhook sucessfully verified');
            return true;
        } catch (error) {
            console.error('Failed to verify webhook:', error.message);
            throw new Error('Webhook verification failed');
        }
    }

    
}
