import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PizzaModule } from './pizza/pizza.module';
import { ConfigModule } from 'nestjs-dotenv';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('MONGO_SRV_HERE'),
    ConfigModule.forRoot(),
    PizzaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
