import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_ConfigService_: ConfigService) => ({
        uri: _ConfigService_.get<string>('DB_URI'),
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
