
# Crypto POS

This is an API for a crypto POS system using NestJS;

- Integated with a crypto payment gateway for processing payments
- Manage Merchant accounts
.. and many more


## Dependencies and Third-party Configurations 

- **Coinbase Commerce**: coinbase-commerce-node
- **MySQL Database**
- **Crypto Convert**: Crypto-convert

Please check `packages.json` for a list of other dependencies required





### Installation

1. Clone the repository:
   ```
   git clone https://github.com/IanOmbija/crypto-pos.git
   cd crypto-pos
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`COINBASE_API_KEY=**your_coinbase_key** ` - Shared this on a seperate chat

`COINBASE_WEBHOOK_SECRET=my_webhook_secret` - If we would like to test the webhook function

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

Once everything is successfull you can access the API using:
`http://localhost:3000` - as the endpoint. It can change according to your own setup.

## Test : How to run the unit tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API Reference and Endpoints

Sample URL: `http://localhost:3000`

**Merchants Management**

#### - Create a merchant

```http
  POST /api/merchant/{id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the merchant |


Sample `request` sent to the endpoint

```http
POST  http://<yourlocalhosturl>/api/merchant/create-merchant
```
The above endpoint allows the user to create a Merchant;
#### Sample Request Body
```json
 {
  "name": "Ian MerchantFour"
}

```

#### Success Response 200 OK
```json
{
    "name": "Ian MerchantFour",
    "accountBalance": 0,
    "createdAt": "2024-06-01T20:20:28.444Z",
    "updatedAt": "2024-06-01T20:20:28.444Z",
    "id": 4
}
```
##
#### - Get all merchants

```http
  GET /api/merchant
```

Sample `request` sent to the endpoint

```http
GET  http://<yourlocalhosturl>/api/merchant
```
The above endpoint allows the user to fetch all the merchants;

#### Success Response 200 OK
```json
[
    {
        "id": 1,
        "name": "Ian MerchantOne",
        "accountBalance": 0
    },
    {
        "id": 2,
        "name": "Ian MerchantTwo",
        "accountBalance": 54791
    },
    {
        "id": 3,
        "name": "Ian MerchantThree",
        "accountBalance": 0
    }
]
```
##
#### - Get a merchant

```http
  GET /api/merchant/{id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the merchant to fetch |

Sample `request` sent to the endpoint

```http
GET  http://<yourlocalhosturl>/api/merchant/{id}
```
The above endpoint allows the user to fetch a merchant's details;

#### Success Response 200 OK
```json
{
    "id": 2,
    "name": "Ian MerchantTwo",
    "accountBalance": 97509
}
```
##
#### - Get a merchant's settlement History

```http
  GET /api/merchant/{id}/settlement-history
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the merchant to fetch |

Sample `request` sent to the endpoint

```http
GET  http://<yourlocalhosturl>/api/merchant/{id}/settlement-history
```
The above endpoint allows the user to fetch a merchant's settlment history;

#### Success Response 200 OK
```json
[
    {
        "id": 1,
        "amount": 0.001,
        "convertedAmount": 62,
        "cryptoCurrency": "BTC",
        "fiatCurrency": "EUR",
        "merchantId": 2,
        "settledAt": "2024-06-01T13:34:22.000Z"
    },
    {
        "id": 2,
        "amount": 0.001,
        "convertedAmount": 67,
        "cryptoCurrency": "BTC",
        "fiatCurrency": "USD",
        "merchantId": 2,
        "settledAt": "2024-06-01T13:34:37.000Z"
    },
    {
        "id": 3,
        "amount": 0.001,
        "convertedAmount": 10646,
        "cryptoCurrency": "BTC",
        "fiatCurrency": "JPY",
        "merchantId": 2,
        "settledAt": "2024-06-01T13:34:46.000Z"
    },
    {
        "id": 4,
        "amount": 0.001,
        "convertedAmount": 31943,
        "cryptoCurrency": "BTC",
        "fiatCurrency": "JPY",
        "merchantId": 2,
        "settledAt": "2024-06-01T13:40:06.000Z"
    }
]
```
##

**Crypto Payment Gateway Integration : Coinbase Commerce**

#### - Initiate a payment request

```http
  POST /api/payment/initiate-crypto-payment
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`      | `string` | **Required**. The amount to be settled |
|`currency`    | `string`|**Required**. The currency|
| `merchantId`|`string`| **Optional**. Acts as reference purpose for the merchant |


Sample `request` sent to the endpoint

```http
POST  http://<yourlocalhosturl>/api/payment/initiate-crypto-payment
```
The above endpoint allows the user to intiate a payment to a Merchant;
#### Sample Request Body
```json
{
    "amount": 0.001,
    "currency": "USD",
    "merchantId": 2
}

```

#### Success Response 200 OK
```json
{
    "success": true,
    "charge": {
        "brand_color": "#122332",
        "brand_logo_url": "",
        "charge_kind": "WEB3",
        "code": "D7QXRRZK5XX",
        "collected_email": false,
        "created_at": "2024-05-29T18:03:45Z",
        "description": "Payment for services",
        "expires_at": "2024-05-31T18:03:45Z",
        "hosted_url": "https://commerce.coinbase.com/pay/cfbf2099-9278-4a6b-9773-5bb5ac2529ad5X",
        "id": "cfbf2099-9278-4a6b-9773-5bb5ac2529ad5X",
        "metadata": {
            "merchant_id": "2"
        },
        "name": "IvoryPay payment order",
        "organization_name": "",
        "payments": [],
        "pricing": {
            "local": {
                "amount": "0.001",
                "currency": "USD"
            },
            "settlement": {
                "amount": "0.001",
                "currency": "USDC"
            }
        },
        "pricing_type": "fixed_price",
        "pwcb_only": false,
        "redirects": {
            "cancel_url": "",
            "success_url": "",
            "will_redirect_after_success": false
        },
        "support_email": "ian@ian",
        "timeline": [
            {
                "status": "NEW",
                "time": "2024-05-29T18:03:45Z"
            }
        ],
    ............
}
```
##

### - Receive Payment Confirmations

- Configure Coinbase Commerce Webhook
- Set up the webhook URL in your Coinbase Commerce dashboard (https://commerce.coinbase.com/dashboard/settings/integrations).
- Use Ngrok to expose your localhost URL 
- Point it to your endpoint: in this case ` http://localhost:3000/api/payment/webhook`.
- Ensure you have `COINBASE_WEBHOOK_SECRET` set in your environment variables and it matches the secret configured in Coinbase Commerce settings.

Coinbase Commerce will send test webhook events for you to verify.

I have `(event === 'charge:confirmed' && paymentStatus === 'COMPLETED')` for test payment confirmations.

- This therefore updates the **merchant's Account balance** upon completion


#### Usage/Example on code

```javascript
// For the demo purpose we pick -successful payment | Update the merchant acc balance
            if (event === 'charge:confirmed' && paymentStatus === 'COMPLETED') {
                await this.merchantService.updateAccountBal(merchantId, amount);
                return `Payment of ${amount} confirmed and settled for merchant ${merchantId}.`;
            } else {
                // for the rest of the other status, we don't do anything at the moment
                return `Payment event: ${event}, status: ${paymentStatus}. No action taken at the moment.`;
            }
```
##

**Fiat Settlemt**

#### - Get a real-time conversion of received cryptocurrency to fiat currency for merchant settlement

```http
GET /api/crypto-convert/convert-to-fiat/:amount/:cryptoCurrency/:fiatCurrency
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`      | `string` | **Required**. Amount to be converted |
|`cryptoCurrency`| `string` | **Required**. Cryptocurrency to be converted from|
|`fiatCurrency`| `string`| **Required**. Fiat Currency to be converted to|

Sample `request` sent to the endpoint

```http
GET  http://<yourlocalhosturl>/api/crypto-convert/convert-to-fiat/215/BTC/EUR
```
Example here is **BTC to EUR**, we can convert more (e.g **BTC** to **USD** or **ETH** to **JPY**)

The above endpoint allows the user to real-time convert the *Cryptocurrency* to *Fiat*;

#### Success Response 200 OK
```json
[
   15508285.07282007
]
```
##

#### - Credit the converted fiat amount to the merchant's account

```http
POST /api/payment/settle
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`      | `number` | **Required**. Amount to be converted |
|`cryptoCurrency`| `string` | **Required**. Cryptocurrency to be converted from|
|`fiatCurrency`| `string`| **Required**. Fiat amount to be converted to|
|`merchantId`| `number`| **Required**. The Merchant account to be settled |

Sample `request` sent to the endpoint

```http
POST  http://<yourlocalhosturl>/api/payment/settle
```
The above endpoint allows the user to credit the converted fiat amount to the merchant's account
#### Sample Request Body
```json
{
    "amount": 0.003,
    "cryptoCurrency": "BTC",
    "fiatCurrency": "JPY",
    "merchantId": 2
}

```

#### Success Response 200 OK
```json
{
    "message": "Successfully settled 0.003, BTC to JPY:(31943.12489733) to merchant ID: 2."
}
```
##

**Mobile App Integration**

#### - Get a real-time exchange rates for supported cryptocurrencies.

```http
GET api/mobile/exchange-rates
```


Sample `request` sent to the endpoint

```http
GET  http://<yourlocalhosturl>/api/mobile/exchange-rates
```
Example here is **BTC to EUR**, we can convert more (e.g **BTC** to **USD** or **ETH** to **JPY**)

The above endpoint allows the user to real-time exchange rates of supported cryptocurrencies

#### Success Response 200 OK
```json
{
    "message": "These are the conversion rates of 1:1 ratio:",
    "BTC_USD": 67671.48749999,
    "ETH_USD": 3801.09,
    "BTC_JPY": 10633378.22382814,
    "ETH_JPY": 597274.11242167
}
```
##





## Authors
Developed by Ian - [@IanOmbija](https://github.com/IanOmbija)


## Tech Stack

**Client:** NestJS
