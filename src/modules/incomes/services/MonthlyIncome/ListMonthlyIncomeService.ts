import { injectable, inject } from 'tsyringe';
import IMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/IMonthlyIncomeRepository';
import MonthlyIncome from '@modules/incomes/infra/typeorm/entities/MonthlyIncome';

interface IRequest {
  user_id: string;
}

@injectable()
class ListMonthlyIncomeService {
  constructor(
    @inject('MonthlyIncomeRepository')
    private monthlyIncomeRepository: IMonthlyIncomeRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<MonthlyIncome[]> {
    const monthlyIncomes = await this.monthlyIncomeRepository.findByUser(
      user_id,
    );

    return monthlyIncomes;
  }
}

export default ListMonthlyIncomeService;
