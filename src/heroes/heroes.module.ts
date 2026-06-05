import { Module } from '@nestjs/common';
import { HeroesController } from 'src/heroes/controllers/heroes.controller';
import { heroesProviders } from 'src/heroes/heroes.providers';
import { HeroesRepository } from 'src/heroes/repositories/heroes.repository';
import { HeroesService } from 'src/heroes/services/heroes.service';

@Module({
  controllers: [HeroesController],
  providers: [...heroesProviders, HeroesRepository, HeroesService],
})
export class HeroesModule {}
