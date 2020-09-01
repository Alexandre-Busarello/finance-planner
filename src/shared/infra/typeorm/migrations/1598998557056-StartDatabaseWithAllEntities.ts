import { MigrationInterface, QueryRunner } from 'typeorm';

export default class StartDatabaseWithAllEntities1598998557056
  implements MigrationInterface {
  name = 'StartDatabaseWithAllEntities1598998557056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "expenses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "income_distribution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "month" integer NOT NULL, "year" integer NOT NULL, "description" character varying NOT NULL, "percentage" numeric NOT NULL, "value" numeric NOT NULL, "accomplished_value" numeric NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c4adadcbd54a578867bdee1d79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "expense_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expense_id" uuid NOT NULL, "name" character varying NOT NULL, "value" double precision NOT NULL, "origin_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_755127531dd7c185830c11535e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "investments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "investment_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investment_id" uuid NOT NULL, "name" character varying NOT NULL, "value" numeric NOT NULL, "origin_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1094b81dacc6076586933ed92e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plan_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plan_id" uuid NOT NULL, "name" character varying NOT NULL, "value" numeric NOT NULL, "origin_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c79b47b01e49f2ed75980b4207" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "income_distribution_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "percentage" numeric NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6383b4baf9b985f3d2c81a16de8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monthly_income" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "month" integer NOT NULL, "year" integer NOT NULL, "value" numeric NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e030371b648b334c9379cf75342" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "user_tokens"`);
    await queryRunner.query(`DROP TABLE "monthly_income"`);
    await queryRunner.query(`DROP TABLE "income_distribution_settings"`);
    await queryRunner.query(`DROP TABLE "plan_values"`);
    await queryRunner.query(`DROP TABLE "plans"`);
    await queryRunner.query(`DROP TABLE "investment_values"`);
    await queryRunner.query(`DROP TABLE "investments"`);
    await queryRunner.query(`DROP TABLE "expense_values"`);
    await queryRunner.query(`DROP TABLE "income_distribution"`);
    await queryRunner.query(`DROP TABLE "expenses"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
