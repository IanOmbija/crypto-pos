import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PaymentService } from './services/payment.service';
import { CoinbaseCommerceService } from './services/coinbase-commerce.service';
import { CryptoConvertService } from './services/crypto-convert.service';
import { PaymentController } from './controllers/payment.controller';
import { CryptoConvertController } from './controllers/crypto-convert.controller';
import { MerchantModule } from './modules/merchant.module';
import { Merchant } from './entities/merchant.entity';
import { Settlement } from './entities/settlement.entity';
import { MobileController } from './controllers/mobile.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'crypto_pos',
      entities: [Merchant, Settlement],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Settlement]),
    MerchantModule],
  controllers: [AppController, PaymentController, CryptoConvertController, MobileController],
  providers: [AppService, 
    PaymentService, 
    CoinbaseCommerceService, 
    CryptoConvertService],
})
export class AppModule {}
