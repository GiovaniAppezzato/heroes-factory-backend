import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/database/database.constants';
import { Hero } from 'src/heroes/entities/hero.entity';
import { HERO_REPOSITORY } from 'src/heroes/heroes.constants';

export const heroesProviders = [
  {
    provide: HERO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Hero),
    inject: [DATA_SOURCE],
  },
];
