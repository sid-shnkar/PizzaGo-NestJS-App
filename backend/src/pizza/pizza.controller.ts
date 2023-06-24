import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth-guard';
import { PizzaService } from './pizza.service';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get('menu-items')
  getMenu() {
    return this.pizzaService.findAllPizza();
  }

  @Post('addPizza')
  async addPizza(@Body() body) {
    return await this.pizzaService.addPizza(body);
  }

  @Post('findSinglePizza')
  async findSinglePizza(@Body() body){
    return await this.pizzaService.findSinglePizza(body);
  }

  
  @Post('addTocart')
  async addToCart(@Body() body) {
    return await this.pizzaService.addToCart(body);
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete('deletePizza')
  // async deletePizza(@Body() body){
  //   return await this.pizzaService.removePizza(body.id);
  // }

  //@UseGuards(JwtAuthGuard)
  @Delete('delete-cart-items')
  async deleteFromCart(@Body() body) {
    return await this.pizzaService.removeFromCart(body.id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('show-cart')
  async showCart(@Body() body) {
    return await this.pizzaService.showCartItems(body.email);
  }


  //@UseGuards(JwtAuthGuard)
  @Patch('update-cart')
  async updateFromCart(@Body() body){
    return await this.pizzaService.updateFromCart(body.id, body.quantity);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('place-order')
  async placeOrder(@Body() body) {
    const cartDetails=await this.pizzaService.showCartItems(body.email);

    const deleteCart=await this.pizzaService.deleteFullCart(body.email);

    return await this.pizzaService.placeOrder(body.email, cartDetails);
  }

  
}
