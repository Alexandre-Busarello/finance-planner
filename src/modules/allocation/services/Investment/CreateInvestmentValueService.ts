import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

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
  ) {}

  public async execute({
    investment_id,
    name,
    origin_id,
    value,
  }: IRequest): Promise<InvestmentValue> {
    const investmentValue = await this.investmentRepository.createValue({
      investment_id,
      name,
      origin_id,
      value,
    });

    return investmentValue;
  }
}

export default CreateInvestmentValueService;
