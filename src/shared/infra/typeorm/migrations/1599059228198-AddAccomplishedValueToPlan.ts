import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAccomplishedValueToPlan1599059228198 implements MigrationInterface {
    name = 'AddAccomplishedValueToPlan1599059228198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" ADD "accomplished_value" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "accomplished_value"`);
    }

}
