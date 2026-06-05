import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { HeroesModule } from 'src/heroes/heroes.module';

@Module({
  imports: [DatabaseModule, HeroesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
