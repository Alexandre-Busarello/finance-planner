import { injectable, inject } from 'tsyringe';

import IIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';

interface IRequest {
  user_id: string;
  year: number;
}

interface IResponse {
  month: number;
  value: number;
  accomplished_value: number;
  balance: number;
}

@injectable()
class GetMonthsWithIncomesAvailable {
  constructor(
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistributionRepository,
  ) {}

  public async execute({ user_id, year }: IRequest): Promise<IResponse[]> {
    const incomes = await this.incomeDistributionRepository.getGroupedByYear(
      user_id,
      year,
    );

    const months = Array.from(Array(12), (_, i) => i + 1);

    const response = months.map(month => {
      const income = incomes.find(find => find.month === month);

      if (!income) {
        return {
          month,
          value: 0,
          accomplished_value: 0,
          balance: 0,
        };
      }

      return {
        month: income.month,
        value: income.value,
        accomplished_value: income.accomplished_value,
        balance: income.value - income.accomplished_value,
      };
    });

    return response;
  }
}

export default GetMonthsWithIncomesAvailable;
