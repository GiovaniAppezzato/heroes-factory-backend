import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateHeroesTable1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'heroes',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '80',
          },
          {
            name: 'date_of_birth',
            type: 'date',
          },
          {
            name: 'universe',
            type: 'varchar',
            length: '80',
          },
          {
            name: 'main_power',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            length: '2048',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            precision: 0,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            precision: 0,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'heroes',
      new TableIndex({
        name: 'IDX_HEROES_CREATED_AT',
        columnNames: ['created_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('heroes', 'IDX_HEROES_CREATED_AT');
    await queryRunner.dropTable('heroes');
  }
}
