import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/database/database.constants';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  synchronize: false,
});

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () =>
      AppDataSource.isInitialized ? AppDataSource : AppDataSource.initialize(),
  },
];
