import MonthlyIncome from '@modules/incomes/infra/typeorm/entities/MonthlyIncome';
import ICreateMonthlyIncomeDTO from '@modules/incomes/dtos/ICreateMonthlyIncomeDTO';

export default interface IMonthlyIncomeRepository {
  findById(id: string): Promise<MonthlyIncome | undefined>;
  findByUser(userId: string): Promise<MonthlyIncome[]>;
  findByUserAndYear(userId: string, year: number): Promise<MonthlyIncome[]>;
  create(data: ICreateMonthlyIncomeDTO): Promise<MonthlyIncome>;
  save(user: MonthlyIncome): Promise<MonthlyIncome>;
}
