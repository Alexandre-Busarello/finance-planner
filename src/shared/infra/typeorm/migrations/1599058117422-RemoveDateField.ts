import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RemoveDateField1599058117422
  implements MigrationInterface {
  name = 'RemoveDateField1599058117422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expense_values" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "investment_values" DROP COLUMN "date"`,
    );
    await queryRunner.query(`ALTER TABLE "plan_values" DROP COLUMN "date"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plan_values" ADD "date" TIMESTAMP NOT NULL DEFAULT '2020-09-02 14:42:15.394'`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" ADD "date" TIMESTAMP NOT NULL DEFAULT '2020-09-02 14:42:14.672'`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_values" ADD "date" TIMESTAMP NOT NULL DEFAULT '2020-09-02 14:42:13.908'`,
    );
  }
}
