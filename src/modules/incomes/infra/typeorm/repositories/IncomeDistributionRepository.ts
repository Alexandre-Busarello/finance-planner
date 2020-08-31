import ICreateIncomeDistributionDTO from '@modules/incomes/dtos/ICreateIncomeDistributionDTO';
import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';
import IGetAllIncomeDistributionDTO from '@modules/incomes/dtos/IGetAllIncomeDistributionDTO';
import IDeleteIncomeDistributionDTO from '@modules/incomes/dtos/IDeleteIncomeDistributionDTO';
import { Repository, getRepository } from 'typeorm';
import IIncomeDistribution from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';

class FakeIncomeDistributionRepository implements IIncomeDistribution {
  private ormRepository: Repository<IncomeDistribution>;

  constructor() {
    this.ormRepository = getRepository(IncomeDistribution);
  }

  async getAll({
    user_id,
    month,
    year,
  }: IGetAllIncomeDistributionDTO): Promise<IncomeDistribution[]> {
    const incomes = this.ormRepository.find({
      where: {
        user_id,
        month,
        year,
      },
    });
    return incomes;
  }

  async create({
    user_id,
    month,
    year,
    description,
    percentage,
    value,
  }: ICreateIncomeDistributionDTO): Promise<IncomeDistribution> {
    const incomeDistribution = this.ormRepository.create({
      user_id,
      month,
      year,
      description,
      percentage,
      value,
    });

    this.ormRepository.save(incomeDistribution);

    return incomeDistribution;
  }

  public async save(
    incomeDistribution: IncomeDistribution,
  ): Promise<IncomeDistribution> {
    this.ormRepository.save(incomeDistribution);

    return incomeDistribution;
  }

  async delete({
    user_id,
    month,
    year,
  }: IDeleteIncomeDistributionDTO): Promise<void> {
    if (year && month) {
      this.ormRepository.delete({
        user_id,
        month,
        year,
      });
    }

    if (month && !year) {
      this.ormRepository.delete({
        user_id,
        month,
      });
    }

    if (!month && year) {
      this.ormRepository.delete({
        user_id,
        year,
      });
    }

    if (!month && !year) {
      this.ormRepository.delete({
        user_id,
      });
    }
  }
}

export default FakeIncomeDistributionRepository;
