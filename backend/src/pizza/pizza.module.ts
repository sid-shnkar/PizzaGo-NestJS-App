import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/user/jwt-strategy';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { cartSchemas, CartSchemas } from './schemas/cart-schemas';
import { pizzaSchema, PizzaSchemas } from './schemas/pizza-schemas';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { config } from 'dotenv';

config(); // Load environment variables

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PizzaSchemas.name, schema: pizzaSchema },
      { name: CartSchemas.name, schema: cartSchemas },
    ]),
    MailgunModule.forRoot({
      username: process.env.MAILGUN_EMAIL_USERNAME,
      key: process.env.MAILGUN_API_KEY,
    }),
  ],
  controllers: [PizzaController],
  providers: [PizzaService, JwtStrategy],
})
export class PizzaModule {}
