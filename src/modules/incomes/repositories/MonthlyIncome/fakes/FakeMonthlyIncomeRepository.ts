import { uuid } from 'uuidv4';

import MonthlyIncome from '@modules/incomes/infra/typeorm/entities/MonthlyIncome';
import ICreateMonthlyIncomeDTO from '@modules/incomes/dtos/ICreateMonthlyIncomeDTO';
import IMonthlyIncomeRepository from '../IMonthlyIncomeRepository';

class FakeMonthlyIncomeRepository implements IMonthlyIncomeRepository {
  private monthlyIncomes: MonthlyIncome[] = [];

  async findById(id: string): Promise<MonthlyIncome | undefined> {
    const monthlyIncome = this.monthlyIncomes.find(find => find.id === id);
    return monthlyIncome;
  }

  async findByUser(userId: string): Promise<MonthlyIncome[]> {
    const monthlyIncomeList = this.monthlyIncomes.filter(
      find => find.user_id === userId,
    );
    return monthlyIncomeList;
  }

  async findByUserAndYear(
    userId: string,
    year: number,
  ): Promise<MonthlyIncome[]> {
    const monthlyIncomeList = this.monthlyIncomes.filter(
      find => find.user_id === userId && find.year === year,
    );
    return monthlyIncomeList;
  }

  async create(data: ICreateMonthlyIncomeDTO): Promise<MonthlyIncome> {
    const monthlyIncome = new MonthlyIncome();

    Object.assign(monthlyIncome, { id: uuid() }, data);
    this.monthlyIncomes.push(monthlyIncome);

    return monthlyIncome;
  }

  public async save(monthlyIncome: MonthlyIncome): Promise<MonthlyIncome> {
    const findIndex = this.monthlyIncomes.findIndex(
      find => find.id === monthlyIncome.id,
    );
    this.monthlyIncomes[findIndex] = monthlyIncome;

    return monthlyIncome;
  }
}

export default FakeMonthlyIncomeRepository;
