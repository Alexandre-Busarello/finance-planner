import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';
import PlanValue from '@modules/allocation/infra/typeorm/entities/PlanValue';
import IPlanRepository from '@modules/allocation/repositories/Plan/IPlanRepository';

interface IRequest {
  plan_id: string;
  name: string;
  value: number;
  origin_id: string;
}

@injectable()
class CreatePlanValueService {
  constructor(
    @inject('PlanRepository')
    private plansRepository: IPlanRepository,
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistributionRepository,
  ) {}

  public async execute({
    plan_id,
    name,
    origin_id,
    value,
  }: IRequest): Promise<PlanValue> {
    const originIncome = await this.incomeDistributionRepository.getById(
      origin_id,
    );

    if (!originIncome) {
      throw new AppError('The origin income distribution not found');
    }

    if (value > originIncome.value - originIncome.accomplished_value) {
      throw new AppError('The origin income distribution is been reached');
    }

    const planValue = await this.plansRepository.createValue({
      plan_id,
      name,
      origin_id,
      value,
    });

    originIncome.accomplished_value += value;

    await this.incomeDistributionRepository.saveAll([originIncome]);

    return planValue;
  }
}

export default CreatePlanValueService;
