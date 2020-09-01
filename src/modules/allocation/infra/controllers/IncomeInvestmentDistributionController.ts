import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateInvestmentValueService from '@modules/allocation/services/Investment/CreateInvestmentValueService';

export default class IncomeInvestmentDistributionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, value } = request.body;
    const { investment_id, origin_id } = request.params;

    const createInvestmentValue = container.resolve(
      CreateInvestmentValueService,
    );

    const investmentValue = await createInvestmentValue.execute({
      investment_id,
      origin_id,
      name,
      value,
    });

    return response.status(201).json(investmentValue);
  }
}
