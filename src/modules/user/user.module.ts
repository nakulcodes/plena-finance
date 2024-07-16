import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/typeorm/entities/user.entity';
import { UserBlockService } from './block.service';
import { UserBlockController } from './block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, UserBlockController],
  providers: [UserService, UserBlockService],
})
export class UserModule { }
