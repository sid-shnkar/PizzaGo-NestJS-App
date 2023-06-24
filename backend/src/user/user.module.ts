import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local.strategy';
import { userSchema, UserSchemas } from './schemas/user-schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserSchemas.name, schema: userSchema }]),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtStrategy],
})
export class UserModule {}
