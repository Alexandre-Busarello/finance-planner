import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToIncomeDistributionSettings1595098638471
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'income_distribution_settings',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'income_distribution_settings',
      new TableForeignKey({
        name: 'IncomeDistributionSettingsUserFK',
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
      'income_distribution_settings',
      'IncomeDistributionSettingsUserFK',
    );

    await queryRunner.dropColumn('income_distribution_settings', 'user_id');
  }
}
