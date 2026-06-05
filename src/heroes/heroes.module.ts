import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { heroesProviders } from './heroes.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...heroesProviders],
  exports: [...heroesProviders],
})
export class HeroesModule {}
