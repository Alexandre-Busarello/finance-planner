import ICreateIncomeDistributionDTO from '@modules/incomes/dtos/ICreateIncomeDistributionDTO';
import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';
import IGetAllIncomeDistributionDTO from '@modules/incomes/dtos/IGetAllIncomeDistributionDTO';
import IDeleteIncomeDistributionDTO from '@modules/incomes/dtos/IDeleteIncomeDistributionDTO';
import { Repository, getRepository } from 'typeorm';
import IIncomeDistribution from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';
import IIncomeDistributionGroupedByYearDTO from '@modules/incomes/dtos/IIncomeDistributionGroupedByYearDTO';

class IncomeDistributionRepository implements IIncomeDistribution {
  private ormRepository: Repository<IncomeDistribution>;

  constructor() {
    this.ormRepository = getRepository(IncomeDistribution);
  }

  async getById(id: string): Promise<IncomeDistribution | undefined> {
    const income = this.ormRepository.findOne(id);
    return income;
  }

  async getGroupedByYear(
    user_id: string,
    year: number,
  ): Promise<IIncomeDistributionGroupedByYearDTO[]> {
    const incomes = await this.ormRepository.query(
      `
      select 
        "year", 
        "month", 
        SUM(percentage) as percentage, 
        SUM(value) as value, 
        SUM(accomplished_value) as accomplished_value
      from 
        "income_distribution"
      where
        "user_id" = '${user_id}' AND
        "year" = ${year}
      group by
        "year", "month" 
      `,
    );
    return incomes;
  }

  async getTotalValue(user_id: string): Promise<number> {
    const incomes = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    const incomesSum = incomes.reduce((sum, income) => {
      return sum + (income.value - income.accomplished_value);
    }, 0);

    return incomesSum;
  }

  async getAll({
    user_id,
    month,
    year,
  }: IGetAllIncomeDistributionDTO): Promise<IncomeDistribution[]> {
    const incomes = await this.ormRepository.find({
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
    accomplished_value,
  }: ICreateIncomeDistributionDTO): Promise<IncomeDistribution> {
    const incomeDistribution = this.ormRepository.create({
      user_id,
      month,
      year,
      description,
      percentage,
      value,
      accomplished_value,
    });

    await this.ormRepository.save(incomeDistribution);

    return incomeDistribution;
  }

  public async saveAll(
    incomes: IncomeDistribution[],
  ): Promise<IncomeDistribution[]> {
    incomes.forEach(async income => {
      await this.ormRepository.save(income);
    });

    return incomes;
  }

  async delete({
    user_id,
    month,
    year,
  }: IDeleteIncomeDistributionDTO): Promise<void> {
    if (year && month) {
      await this.ormRepository.delete({
        user_id,
        month,
        year,
      });
    }

    if (month && !year) {
      await this.ormRepository.delete({
        user_id,
        month,
      });
    }

    if (!month && year) {
      await this.ormRepository.delete({
        user_id,
        year,
      });
    }

    if (!month && !year) {
      await this.ormRepository.delete({
        user_id,
      });
    }
  }
}

export default IncomeDistributionRepository;
