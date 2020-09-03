import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/IIncomeDistributionSettingsRepository';
import IIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';
import IMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/IMonthlyIncomeRepository';

import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

@injectable()
class CreateIncomesDistributionService {
  constructor(
    @inject('IncomeDistributionSettingsRepository')
    private incomeDistributionSettingRepository: IIncomeDistributionSettingsRepository,
    @inject('MonthlyIncomeRepository')
    private monthlyIncomeRepository: IMonthlyIncomeRepository,
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistributionRepository,
  ) {}

  public async execute({
    user_id,
    month,
    year,
  }: IRequest): Promise<IncomeDistribution[]> {
    const settings = await this.incomeDistributionSettingRepository.findByUser(
      user_id,
    );

    if (!settings) {
      throw new AppError(
        'Income distribution settings not found to create a income distribution',
      );
    }

    const monthlyIncomeList = await this.monthlyIncomeRepository.findByUserAndMonthAndYear(
      user_id,
      month,
      year,
    );

    if (!monthlyIncomeList || !monthlyIncomeList.length) {
      throw new AppError(
        'Monthly income not found to create a income distribution',
      );
    }

    const monthlyIncomeValue = monthlyIncomeList.reduce(
      (sum, monthlyIncome) => {
        return sum + Number(monthlyIncome.value);
      },
      0,
    );

    const incomesFromDb = await this.incomeDistributionRepository.getAll({
      user_id,
      year,
      month,
    });

    const incomes: IncomeDistribution[] = [];

    // Create if not exists
    if (!incomesFromDb.length) {
      settings.forEach(async setting => {
        const income = await this.incomeDistributionRepository.create({
          user_id,
          year,
          month,
          description: setting.description,
          percentage: setting.percentage,
          value: Number(
            ((monthlyIncomeValue / 100) * setting.percentage).toFixed(2),
          ),
          accomplished_value: 0,
        });
        incomes.push(income);
      });

      return incomes;
    }

    // Updated if exists
    incomesFromDb.forEach(async income => {
      const updateIncome = income;

      updateIncome.value = Number(
        ((monthlyIncomeValue / 100) * updateIncome.percentage).toFixed(2),
      );

      incomes.push(income);
    });

    this.incomeDistributionRepository.saveAll(incomes);

    return incomes;
  }
}

export default CreateIncomesDistributionService;
