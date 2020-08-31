import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IIncomeDistribution from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';

import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';
import IMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/IMonthlyIncomeRepository';

interface IRequest {
  id: string;
  percentage: number;
}

@injectable()
class UpdateIncomesDistributionService {
  constructor(
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistribution,
    @inject('MonthlyIncomeRepository')
    private monthlyIncomeRepository: IMonthlyIncomeRepository,
  ) {}

  public async execute(
    incomesDistribution: IRequest[],
  ): Promise<IncomeDistribution[]> {
    const firstIncomeDistribution = await this.incomeDistributionRepository.getById(
      incomesDistribution[0].id,
    );

    if (!firstIncomeDistribution) {
      throw new AppError('The income distribution not found');
    }

    const incomesDistributionList = await this.incomeDistributionRepository.getAll(
      {
        user_id: firstIncomeDistribution.user_id,
        month: firstIncomeDistribution.month,
        year: firstIncomeDistribution.year,
      },
    );

    const monthlyIncomes = await this.monthlyIncomeRepository.findByUserAndMonthAndYear(
      firstIncomeDistribution.user_id,
      firstIncomeDistribution.month,
      firstIncomeDistribution.year,
    );

    const monthlyIncomeValue = monthlyIncomes.reduce((sum, monthlyIncome) => {
      return sum + Number(monthlyIncome.value);
    }, 0);

    // With all incomes distribution from database, update if needed
    incomesDistributionList.forEach(income => {
      const toIncomeDistribution = incomesDistribution.find(
        find => find.id === income.id,
      ) as IncomeDistribution;

      if (toIncomeDistribution) {
        const fromIncomeDistributionIndex = incomesDistributionList.findIndex(
          find => find.id === income.id,
        );

        incomesDistributionList[fromIncomeDistributionIndex].percentage =
          toIncomeDistribution.percentage;

        incomesDistributionList[fromIncomeDistributionIndex].value = Number(
          (
            (monthlyIncomeValue / 100) *
            toIncomeDistribution.percentage
          ).toFixed(2),
        );
      }
    });

    const percentageSum = incomesDistributionList.reduce((sum, income) => {
      return sum + Number(income.percentage);
    }, 0);

    if (percentageSum !== 100) {
      throw new AppError(
        'The percentage sum of the incomes distribution need be 100',
      );
    }

    return this.incomeDistributionRepository.saveAll(incomesDistributionList);
  }
}

export default UpdateIncomesDistributionService;
