import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PizzaModule } from './pizza/pizza.module';
import { ConfigModule } from 'nestjs-dotenv';
import { config } from 'dotenv';

config(); // Load environment variables

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot(),
    PizzaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
