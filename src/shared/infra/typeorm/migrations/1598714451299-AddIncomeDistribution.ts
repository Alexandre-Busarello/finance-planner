import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class AddIncomeDistribution1598714451299
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'income_distribution',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'month',
            type: 'smallint',
          },
          {
            name: 'year',
            type: 'smallint',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'percentage',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'income_distribution',
      new TableForeignKey({
        name: 'IncomeDistributionUserFK',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'income_distribution',
      'IncomeDistributionUserFK',
    );

    await queryRunner.dropTable('income_distribution');
  }
}
