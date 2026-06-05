import { DataSource } from 'typeorm';
import { Hero } from './entities/hero.entity';

export const heroesProviders = [
  {
    provide: 'HERO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Hero),
    inject: ['DATA_SOURCE'],
  },
];
