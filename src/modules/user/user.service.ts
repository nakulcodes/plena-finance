import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/database/typeorm/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async search(username?: string, minAge?: number, maxAge?: number): Promise<UserEntity[]> {
    const options = {
      where: {},
    };

    if (username) {
      options.where['username'] = username;
    }

    if (minAge !== undefined || maxAge !== undefined) {
      const now = new Date();
      const currentYear = now.getFullYear();

      let minBirthdate: Date;
      let maxBirthdate: Date;

      if (minAge !== undefined) {
        minBirthdate = new Date(currentYear - minAge, now.getMonth(), now.getDate());
      }

      if (maxAge !== undefined) {
        maxBirthdate = new Date(currentYear - maxAge, now.getMonth(), now.getDate());
      }

      if (minBirthdate && maxBirthdate) {
        options.where['birthdate'] = Between(maxBirthdate.toISOString(), minBirthdate.toISOString());
      } else if (minBirthdate) {
        options.where['birthdate'] = LessThan(minBirthdate.toISOString());
      } else if (maxBirthdate) {
        options.where['birthdate'] = MoreThan(maxBirthdate.toISOString());
      }
    }

    return this.userRepository.find(options);
  }
}
