import { injectable, inject } from 'tsyringe';

import IIncomeDistribution from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';

import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

@injectable()
class GetIncomesDistributionService {
  constructor(
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistribution,
  ) {}

  public async execute({
    user_id,
    month,
    year,
  }: IRequest): Promise<IncomeDistribution[]> {
    const incomes = await this.incomeDistributionRepository.getAll({
      user_id,
      month,
      year,
    });
    return incomes;
  }
}

export default GetIncomesDistributionService;
