import { injectable, inject } from 'tsyringe';

import IIncomeDistribution from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';

interface IRequest {
  user_id: string;
}

@injectable()
class GetTotalAvailable {
  constructor(
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistribution,
  ) {}

  public async execute({ user_id }: IRequest): Promise<number> {
    const value = await this.incomeDistributionRepository.getTotalValue(
      user_id,
    );
    return value;
  }
}

export default GetTotalAvailable;
