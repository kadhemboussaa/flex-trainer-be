import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { managerController } from './manager.controller';
import { managerService } from './manager.service';
import { ManagerSchema } from 'src/schema/manager.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'manager', schema: ManagerSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [managerController],
  providers: [managerService],
  exports: [managerService],
})
export class ManagerModule {}
