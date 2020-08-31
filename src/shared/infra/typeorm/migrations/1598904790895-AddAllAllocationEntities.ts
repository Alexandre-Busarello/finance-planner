import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAllAllocationEntities1598904790895
  implements MigrationInterface {
  name = 'AddAllAllocationEntities1598904790895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP CONSTRAINT "IncomeDistributionUserFK"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" DROP CONSTRAINT "IncomeDistributionSettingsUserFK"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_income" DROP CONSTRAINT "MonthlyIncomeUserFK"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" DROP CONSTRAINT "TokenUser_FK"`,
    );
    await queryRunner.query(
      `CREATE TABLE "expenses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "expense_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expense_id" uuid NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "origin_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_755127531dd7c185830c11535e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "investments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "investment_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investment_id" uuid NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "origin_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1094b81dacc6076586933ed92e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plan_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plan_id" uuid NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "origin_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c79b47b01e49f2ed75980b4207" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "month"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "month" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "year"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "year" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "percentage" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "accomplished_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "accomplished_value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" ADD "percentage" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "month"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "month" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "year"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "year" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD "user_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_49a0ca239d34e74fdc4e0625a78" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD CONSTRAINT "FK_8c1eecb27d87f89cc38c13398e7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_values" ADD CONSTRAINT "FK_d0c09c365e2471f8677af69d614" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_values" ADD CONSTRAINT "FK_0acccff8171e755a0b3399341ed" FOREIGN KEY ("origin_id") REFERENCES "income_distribution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_fe9d6987f15c1cce3ff55dd25e2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" ADD CONSTRAINT "FK_6db439b5318beb85b3f1c1ec341" FOREIGN KEY ("investment_id") REFERENCES "investments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" ADD CONSTRAINT "FK_0b52b5edc00dfe1ba7b12d261cb" FOREIGN KEY ("origin_id") REFERENCES "income_distribution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plans" ADD CONSTRAINT "FK_32f8c25a5ce0e33674e1253411e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_values" ADD CONSTRAINT "FK_6ad493987e6b80530d2578a5724" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_values" ADD CONSTRAINT "FK_c2ef6ffe96c52c3589691b44967" FOREIGN KEY ("origin_id") REFERENCES "income_distribution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" ADD CONSTRAINT "FK_acf8538a8509dfc070962d0b251" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD CONSTRAINT "FK_c5ab5455086d44c1e98a3e94827" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_income" DROP CONSTRAINT "FK_c5ab5455086d44c1e98a3e94827"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" DROP CONSTRAINT "FK_acf8538a8509dfc070962d0b251"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_values" DROP CONSTRAINT "FK_c2ef6ffe96c52c3589691b44967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_values" DROP CONSTRAINT "FK_6ad493987e6b80530d2578a5724"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plans" DROP CONSTRAINT "FK_32f8c25a5ce0e33674e1253411e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" DROP CONSTRAINT "FK_0b52b5edc00dfe1ba7b12d261cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_values" DROP CONSTRAINT "FK_6db439b5318beb85b3f1c1ec341"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_fe9d6987f15c1cce3ff55dd25e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_values" DROP CONSTRAINT "FK_0acccff8171e755a0b3399341ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_values" DROP CONSTRAINT "FK_d0c09c365e2471f8677af69d614"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP CONSTRAINT "FK_8c1eecb27d87f89cc38c13398e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_49a0ca239d34e74fdc4e0625a78"`,
    );
    await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "value" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "year"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "year" smallint NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "monthly_income" DROP COLUMN "month"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD "month" smallint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" ADD "percentage" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "accomplished_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "accomplished_value" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "value" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "percentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "percentage" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "year"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "year" smallint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" DROP COLUMN "month"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD "month" smallint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(`DROP TABLE "plan_values"`);
    await queryRunner.query(`DROP TABLE "plans"`);
    await queryRunner.query(`DROP TABLE "investment_values"`);
    await queryRunner.query(`DROP TABLE "investments"`);
    await queryRunner.query(`DROP TABLE "expense_values"`);
    await queryRunner.query(`DROP TABLE "expenses"`);
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD CONSTRAINT "TokenUser_FK" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_income" ADD CONSTRAINT "MonthlyIncomeUserFK" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution_settings" ADD CONSTRAINT "IncomeDistributionSettingsUserFK" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_distribution" ADD CONSTRAINT "IncomeDistributionUserFK" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
