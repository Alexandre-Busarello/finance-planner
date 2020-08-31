import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeTypesOfTables1598914049393
  implements MigrationInterface {
  name = 'ChangeTypesOfTables1598914049393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "percentage" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "value" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "accomplished_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "accomplished_value" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" ADD "percentage" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "value" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" ADD "percentage" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "accomplished_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "accomplished_value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "percentage" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL`,
    );
  }
}
