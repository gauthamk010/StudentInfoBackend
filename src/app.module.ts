import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import  * as dotenv from 'dotenv';
import { StudentModule } from './student-data/student/student.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/TESTING',
      {dbName: 'TESTING',
      }
    ),
    AuthModule,
    StudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
