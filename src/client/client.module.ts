import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { clientController } from './client.controller';
import { clientService } from './client.service';
import { ClientSchema } from 'src/schema/client.schema';
import { UserModule } from 'src/user/user.module';
import { MailService } from './mail.service';
import { coachService } from 'src/coach/coach.service';
import { coachModule } from 'src/coach/coach.module';
import { coachClientSchema } from 'src/schema/coachClient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'client', schema: ClientSchema }]),
    MongooseModule.forFeature([
      { name: 'coachClientSchema', schema: coachClientSchema },
    ]),
    forwardRef(() => UserModule),
    coachModule,
  ],
  controllers: [clientController],
  providers: [clientService, MailService],
  exports: [clientService, MailService],
})
export class clientModule {}
