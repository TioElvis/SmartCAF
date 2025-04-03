import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
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
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_ConfigService_: ConfigService) => ({
        secret: _ConfigService_.get<string>('JWT_SECRET'),
      }),
    }),
    PassportModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
