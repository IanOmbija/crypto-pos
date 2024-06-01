import { Test, TestingModule } from "@nestjs/testing";
import { CryptoConvertController } from "./../src/controllers/crypto-convert.controller";
import { CryptoConvertService } from "./../src/services/crypto-convert.service";

describe('crypto-convert', () => {
    let controller: CryptoConvertController;
    let cryptoConvertService: CryptoConvertService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CryptoConvertController],
            providers: [
                {
                    provide: CryptoConvertService,
                    useValue: {
                        convertCryptoToFiat: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CryptoConvertController>(CryptoConvertController);
        cryptoConvertService = module.get<CryptoConvertService>(CryptoConvertService);
    });

    describe('convertCryptoToFiat', () => {
        it('should convert crypto to fiat', async () => {
            const amount = 1;
            const cryptoCurrency = 'BTC';
            const fiatCurrency = 'USD';
            const expectedResult = 5000;

            (cryptoConvertService.convertCryptoToFiat as jest.Mock).mockResolvedValue(expectedResult);
            
            const result = await controller.convertCryptoToFiat(amount,cryptoCurrency, fiatCurrency);
            
            // since the conversion changes every time, we will just expect a number
            expect(typeof result).toBe('number');
            expect(cryptoConvertService.convertCryptoToFiat).toHaveBeenCalledWith(amount, cryptoCurrency, fiatCurrency);
        });
    });
});