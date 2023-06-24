import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/user/jwt-strategy';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { cartSchemas, CartSchemas } from './schemas/cart-schemas';
import { pizzaSchema, PizzaSchemas } from './schemas/pizza-schemas';
import { MailgunModule } from 'nestjs-mailgun';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PizzaSchemas.name, schema: pizzaSchema },
      { name: CartSchemas.name, schema: cartSchemas },
    ]),
    MailgunModule.forRoot({
      username: 'api',
      key: '9dee715acc86120e202bc953977ac558-1b8ced53-d4069889',
    }),
  ],
  controllers: [PizzaController],
  providers: [PizzaService, JwtStrategy],
})
export class PizzaModule {}
