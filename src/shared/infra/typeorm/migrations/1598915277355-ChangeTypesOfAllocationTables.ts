import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeTypesOfAllocationTables1598915277355
  implements MigrationInterface {
  name = 'ChangeTypesOfAllocationTables1598915277355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expense_values" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "expense_values" ADD "value" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" ADD "value" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "plan_values" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "plan_values" ADD "value" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plan_values" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "plan_values" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "expense_values" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "expense_values" ADD "value" integer NOT NULL`,
    );
  }
}
