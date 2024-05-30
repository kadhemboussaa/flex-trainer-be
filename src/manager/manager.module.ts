import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { managerController } from './manager.controller';
import { managerService } from './manager.service';
import { ManagerSchema } from 'src/schema/manager.schema';
import { authService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'manager', schema: ManagerSchema }]),
  UserModule],
  controllers: [managerController],
  providers: [managerService],
  exports: [managerService],
})
export class managerModule {}
