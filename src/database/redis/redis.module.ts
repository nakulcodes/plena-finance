import { Module, Global } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisCacheService } from './redis.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'CACHE_MANAGER',
      useFactory: async (configService: ConfigService) => {
        return new Redis({
          host: configService.get('REDIS_HOST'),
          password: configService.get('REDIS_PASSWORD'),
          port: configService.get('REDIS_PORT'),
        });
      },
      inject: [ConfigService],
    },
    RedisCacheService,
  ],
  exports: ['CACHE_MANAGER', RedisCacheService],
})
export class RedisCacheModule {}