import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('PG_TYPE'),
        host: configService.get<string>('PG_HOST'),
        port: parseInt(configService.get<string>('PG_PORT')),
        username: configService.get<string>('PG_USERNAME'),
        password: configService.get<string>('PG_PASS'),
        database: configService.get<string>('PG_DB_NAME'),
        // autoLoadEntities: true,
        synchronize: true,
        // synchronize: configService.get<boolean>('PG_SYNCHRONIZE'),
        entities: [UserEntity],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CustomTypeOrmModule {}
