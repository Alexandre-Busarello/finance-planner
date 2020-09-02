import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeFieldName1599057730892
  implements MigrationInterface {
  name = 'ChangeFieldName1599057730892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" RENAME COLUMN "isDollar" TO "is_dollar"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_values" ALTER COLUMN "date" SET DEFAULT '"2020-09-02T14:42:13.908Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" ALTER COLUMN "date" SET DEFAULT '"2020-09-02T14:42:14.672Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_values" ALTER COLUMN "date" SET DEFAULT '"2020-09-02T14:42:15.394Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plan_values" ALTER COLUMN "date" SET DEFAULT '2020-09-02 14:38:13.871'`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" ALTER COLUMN "date" SET DEFAULT '2020-09-02 14:38:13.243'`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_values" ALTER COLUMN "date" SET DEFAULT '2020-09-02 14:38:12.552'`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" RENAME COLUMN "is_dollar" TO "isDollar"`,
    );
  }
}
