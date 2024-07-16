import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/database/typeorm/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserBlockService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) { }


      async blockUser(userId: string){
        await this.userRepository.update({id:userId},{blocked:true})
      }
      async unblockUser(userId: string){
        await this.userRepository.update({id:userId},{blocked:false})
      }
}