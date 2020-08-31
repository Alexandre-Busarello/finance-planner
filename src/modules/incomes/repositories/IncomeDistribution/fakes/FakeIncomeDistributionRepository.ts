import { uuid } from 'uuidv4';

import ICreateIncomeDistributionDTO from '@modules/incomes/dtos/ICreateIncomeDistributionDTO';
import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';
import IGetAllIncomeDistributionDTO from '@modules/incomes/dtos/IGetAllIncomeDistributionDTO';
import IDeleteIncomeDistributionDTO from '@modules/incomes/dtos/IDeleteIncomeDistributionDTO';
import IIncomeDistribution from '../IIncomeDistribution';

class FakeIncomeDistributionRepository implements IIncomeDistribution {
  private incomesDistribution: IncomeDistribution[] = [];

  async getById(id: string): Promise<IncomeDistribution | undefined> {
    const income = this.incomesDistribution.find(find => find.id === id);
    return income;
  }

  async getAll({
    user_id,
    month,
    year,
  }: IGetAllIncomeDistributionDTO): Promise<IncomeDistribution[]> {
    const incomes = this.incomesDistribution.filter(
      find =>
        find.user_id === user_id && find.month === month && find.year === year,
    );
    return incomes;
  }

  async create(
    data: ICreateIncomeDistributionDTO,
  ): Promise<IncomeDistribution> {
    const incomeDistribution = new IncomeDistribution();

    Object.assign(incomeDistribution, { id: uuid() }, data);
    this.incomesDistribution.push(incomeDistribution);

    return incomeDistribution;
  }

  public async saveAll(
    incomes: IncomeDistribution[],
  ): Promise<IncomeDistribution[]> {
    const indexes = incomes.map(income => {
      return this.incomesDistribution.findIndex(find => find.id === income.id);
    });

    indexes.forEach(index => {
      this.incomesDistribution[index] = {
        ...this.incomesDistribution[index],
        ...incomes[index],
      };
    });

    return this.incomesDistribution;
  }

  async delete({
    user_id,
    month,
    year,
  }: IDeleteIncomeDistributionDTO): Promise<void> {
    if (year && month) {
      this.incomesDistribution = this.incomesDistribution.filter(
        find =>
          find.user_id !== user_id &&
          find.month !== month &&
          find.year !== year,
      );
    }

    if (month && !year) {
      this.incomesDistribution = this.incomesDistribution.filter(
        find => find.user_id !== user_id && find.month !== month,
      );
    }

    if (!month && year) {
      this.incomesDistribution = this.incomesDistribution.filter(
        find => find.user_id !== user_id && find.year !== year,
      );
    }

    if (!month && !year) {
      this.incomesDistribution = this.incomesDistribution.filter(
        find => find.user_id !== user_id,
      );
    }
  }
}

export default FakeIncomeDistributionRepository;
