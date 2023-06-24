import { BadRequestException, HttpException, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userSchema, UserSchemas } from './schemas/user-schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { resourceLimits } from 'worker_threads';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemas.name)
    private readonly userModel: Model<UserSchemas>,
    private jwtService: JwtService,
  ) {}

  async createUser(userObj) {
    try {
      const { email, password} = userObj;
      const userExist = await this.userModel.findOne({ email: email }).exec();
      if (userExist != null)
        throw new BadRequestException('User Already Exist');
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(userObj.password, saltOrRounds);
      return await new this.userModel({
        email: userObj.email,
        password: hashPassword
      }).save();
    } catch (e) {
      throw new BadRequestException('Some Error Occurred');
    }
  }

  async validateUser(userObj) {
    const user = await this.userModel.findOne({ email: userObj.email });
    //console.log(user);
    //const hashedPassword = await bcrypt.hash(userObj.password, 10);
    // console.log(hashedPassword);
    // console.log(user.password);
    if(!user){
      return null;
    }
    const passwordCompare=await bcrypt.compare(userObj.password, user.password);
    console.log(passwordCompare);
    if (user && passwordCompare) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async findSingleUser(userObj){
    const user = await this.userModel.findOne({ _id: userObj.id });
    if(!user){
      throw new HttpException('User details not found', 401);
    }

    return user;
  }



  async login(userObj) {
    const userExist=await this.validateUser(userObj);
    if (!userExist)
    {
       throw new HttpException('User not found', 401);
    }
    
    const payload = { username: userObj.username };

    let isAdmin;
    if(userObj.email === 'admin@example.com' && userObj.password === 'admin123'){
      isAdmin=true;
    }else{
      isAdmin=false;
    }

    const userdetails=await this.userModel.findOne({ email: userObj.email });
    console.log(userdetails);
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: "3600",
      _id: userdetails._id,
      email: userdetails.email,
      isAdmin: isAdmin
    };
  }

  async findAll() {
    return await this.userModel.find({}).exec();
  }

  async deleteUser(id){
   return await this.userModel.findByIdAndDelete({_id: id});
  }

}
