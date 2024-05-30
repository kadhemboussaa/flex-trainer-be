import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { adminController } from './admin.controller';
import { adminService } from './admin.service';
import { AdminSchema } from 'src/schema/admin.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'admin', schema: AdminSchema }]),
  UserModule],
  controllers: [adminController],
  providers: [adminService],
  exports: [adminService],
})
export class adminModule {}
