import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { CustomTypeOrmModule } from './database/typeorm/custom-typeorm.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        PG_USERNAME: Joi.string().required(),
        PG_PASS: Joi.string().required(),
        PG_DB_NAME: Joi.string().required(),
        PG_PORT: Joi.number().required(),
        PG_HOST: Joi.string().required(),
        PG_TYPE: Joi.string().required(),
        PG_SYNCHRONIZE: Joi.boolean().required(),
      }),
    }),
    CustomTypeOrmModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
