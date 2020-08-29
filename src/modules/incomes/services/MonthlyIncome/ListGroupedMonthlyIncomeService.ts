import { injectable, inject } from 'tsyringe';
import IMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/IMonthlyIncomeRepository';
import MonthlyIncome from '@modules/incomes/infra/typeorm/entities/MonthlyIncome';

import Functions from '@shared/utils/functions';

interface IRequest {
  user_id: string;
  year: number;
}

interface IResponse {
  month: number;
  year: number;
  value: number;
}

@injectable()
class ListGroupedMonthlyIncomeService {
  constructor(
    @inject('MonthlyIncomeRepository')
    private monthlyIncomeRepository: IMonthlyIncomeRepository,
  ) {}

  public async execute({ user_id, year }: IRequest): Promise<IResponse[]> {
    const monthlyIncomes = await this.monthlyIncomeRepository.findByUserAndYear(
      user_id,
      year,
    );

    const groupedMonthlyIncomes = Functions.groupBy<MonthlyIncome>(
      monthlyIncomes,
      income => income.month,
    );

    const monthStart = 1;
    const eachMonthArray = Array.from(
      { length: 12 },
      (_, index) => index + monthStart,
    );

    const allMonthlyIncomes = eachMonthArray.map(month => {
      const values = groupedMonthlyIncomes.get(month);
      return {
        month,
        year,
        value: values
          ? values.reduce((sum, monthlyIncome) => {
              return sum + monthlyIncome.value;
            }, 0)
          : 0,
      };
    });

    return allMonthlyIncomes;
  }
}

export default ListGroupedMonthlyIncomeService;
