import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(''), MongooseModule.forFeature([{}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
