import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { clientController } from './client.controller';
import { clientService } from './client.service';
import { ClientSchema } from 'src/schema/client.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'client', schema: ClientSchema }]),
    UserModule,
  ],
  controllers: [clientController],
  providers: [clientService],
  exports: [clientService],
})
export class clientModule {}
