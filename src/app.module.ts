import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { MangasModule } from './mangas/mangas.module';
import { AuthModule } from './auth/auth.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { AdminGuard } from './common/guards/admin.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    StorageModule,
    MangasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard }, // 1. rate limit
    { provide: APP_GUARD, useClass: ApiKeyGuard }, // 2. authentification (peuple req.user)
    { provide: APP_GUARD, useClass: AdminGuard }, // 3. autorisation (lit req.user.role)
  ],
})
export class AppModule {}
