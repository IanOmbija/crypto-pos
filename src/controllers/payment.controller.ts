import { Controller , Post, Body, Headers} from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CoinbaseCommerceService } from 'src/services/coinbase-commerce.service';


@Controller('api/payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService, private readonly coinbaseService: CoinbaseCommerceService) {}

    @Post('initiate-crypto-payment')
    async initiateCryptoPayment(@Body() PaymentRequest: any) {
        const { amount, currency, merchantId } = PaymentRequest;
        //return this.paymentService.initiateCryptoPayment(amount, currency, customerEmail);
        const charge = await this.paymentService.initiateCryptoPayment(amount, currency, merchantId);
        return { success: true, charge};
    } catch (error) {
        return { success: false, error: error.message };
    }

    @Post('retrieve-payment-details')
    async retrievePaymentDetails(@Body() PaymentRequest: any) {
        try {
            const { chargeId } = PaymentRequest;
            const chargeDetails = await this.paymentService.retrievePaymentDetails(chargeId);
            return chargeDetails;
        } catch (error) {
            console.error ('Failed to retrieve payment details:', error);
            throw new Error(`Failed to retrieve the payment details: ${error.message}`);
        }
    }

    @Post('settle')
    async settlePayment(@Body() settleDetails: any) {
        const {amount, cryptoCurrency, fiatCurrency, merchantId} = settleDetails;

        const settlementMessage = await this.paymentService.settlePayment(amount, cryptoCurrency, fiatCurrency, merchantId);
        return {message: settlementMessage};
    }

    @Post('webhook')
    async handleWebhook(@Body() webhookData: any, @Headers('x-cc-webhook-signature') signature: string) {
        try {
            await this.coinbaseService.verifyWebhookSignature(JSON.stringify(webhookData), signature);

            //we process the data from webhook
            const paymentStatus = await this.paymentService.processPaymentConfirmation(webhookData);
            console.log(`Recieved payment status: ${paymentStatus}`);

            return {received: true};
        } catch (error) {
            console.error(`Failed to process webhook data: ${error.message}`);
            return {received: false, error: error.message };
        }

    }


}
