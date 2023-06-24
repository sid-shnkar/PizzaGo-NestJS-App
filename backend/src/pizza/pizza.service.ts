import { BadRequestException, Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PizzaSchemas } from './schemas/pizza-schemas';
import { Model } from 'mongoose';
import { CartSchemas } from './schemas/cart-schemas';
import { MailgunService } from 'nestjs-mailgun';
import { EmailOptions } from 'nestjs-mailgun';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(PizzaSchemas.name)
    private readonly pizzaModel: Model<PizzaSchemas>,
    @InjectModel(CartSchemas.name)
    private readonly cartModel: Model<CartSchemas>,
    private mailgunService: MailgunService,
  ) {}

  async addPizza(pizzaObj) {
    return await new this.pizzaModel({
      ...pizzaObj,
    }).save();
  }
  async findAllPizza() {
    return await this.pizzaModel.find({});
  }

  async findSinglePizza(pizzaObj){
    const pizza = await this.pizzaModel.findOne({ _id: pizzaObj.id });
    if(!pizza){
      throw new HttpException('Pizza details not found', 401);
    }

    return pizza;
  }


  async removePizza(id){
    return await this.pizzaModel.findByIdAndDelete({_id: id});
  }

  async addToCart(cartObj) {
    const getPizza=await this.pizzaModel.findOne({pizzaName: cartObj.pizzaName});
    const netPrice=getPizza.price * cartObj.quantity;

    return await new this.cartModel({
      email: cartObj.email,
      pizzaId: getPizza._id,
      pizzaName: getPizza.pizzaName,
      pizzaPrice: getPizza.price,
      isVeg: getPizza.isVeg,
      quantity: cartObj.quantity,
      totalPrice: netPrice
    }).save();
  }

  async removeFromCart(id) {
    return await this.cartModel.findByIdAndDelete({ _id: id });
  }

  async showCartItems(email) {
    return await this.cartModel.find({ email: email });
  }

  async updateFromCart(id, quantity:number){
    const cartItem=await this.cartModel.findByIdAndUpdate({_id: id}, {$set: {quantity: quantity}});
    if(!cartItem){
      throw new NotFoundException(`cart item #${id} not Found`);
    }

    return cartItem;
  }

  async placeOrder(email,cartDetails) {

    const domain = 'sandbox51db1945d1a9430e8f611d90772f6240.mailgun.org';
    const data = {
      from: 'sidshnkar@gmail.com',
      to: email,
      subject: 'Your Order has been successfully placed!',
      text: `Thank you for placing your pizza order. Your order details are as follows: \n${cartDetails} \n Have a nice day.`,
    };
    // console.log(domain);
    // console.log(data);
    return await this.mailgunService.createEmail(domain, data);
  }

  async deleteFullCart(email){
    return await this.cartModel.deleteMany({email: email});
  }

}
