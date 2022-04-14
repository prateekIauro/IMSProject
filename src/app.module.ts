import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
