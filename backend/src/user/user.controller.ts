import { Body, Controller, Delete, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth-guard';
import { LocalAuth } from './local-auth';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return this.userService.findAll();
  }

  @Post('signup')
  async signup(@Body() body) {
    return await this.userService.createUser(body);
  }

  @Post('login')
  async login(@Body() body) {
    console.log(body);
    return await this.userService.login(body);
  }

  @Post('findSingleUser')
  async findSingleUser(@Body() body){
    return await this.userService.findSingleUser(body);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteUser(@Body() body){
    return await this.userService.deleteUser(body.id);
  }

}
