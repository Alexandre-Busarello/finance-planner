import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';
import IInvestmentRepository from '@modules/allocation/repositories/Investment/IInvestmentRepository';
import InvestmentValue from '@modules/allocation/infra/typeorm/entities/InvestmentValue';

interface IRequest {
  investment_id: string;
  name: string;
  value: number;
  origin_id: string;
}

@injectable()
class CreateInvestmentValueService {
  constructor(
    @inject('InvestmentRepository')
    private investmentRepository: IInvestmentRepository,
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistributionRepository,
  ) {}

  public async execute({
    investment_id,
    name,
    origin_id,
    value,
  }: IRequest): Promise<InvestmentValue> {
    const originIncome = await this.incomeDistributionRepository.getById(
      origin_id,
    );

    if (!originIncome) {
      throw new AppError('The origin income distribution not found');
    }

    if (value > originIncome.value - originIncome.accomplished_value) {
      throw new AppError('The origin income distribution is been reached');
    }

    const investmentValue = await this.investmentRepository.createValue({
      investment_id,
      name,
      origin_id,
      value,
    });

    originIncome.accomplished_value += value;

    await this.incomeDistributionRepository.saveAll([originIncome]);

    return investmentValue;
  }
}

export default CreateInvestmentValueService;
