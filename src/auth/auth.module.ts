import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { authService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { adminModule } from 'src/admin/admin.module';
import { managerModule } from 'src/manager/manager.module';
import { clientModule } from 'src/client/client.module';
import { coachModule } from 'src/coach/coach.module';
import { UserModule } from 'src/user/user.module';
import { APP_CONFIG } from 'src/configs/app-config';

@Module({
  imports: [
    adminModule,
    managerModule,
    clientModule,
    coachModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: APP_CONFIG.JWT_SECRET, 
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    UserModule,
  ],
  controllers: [authController],
  providers: [authService],
})
export class authModule {}
