import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateInvestmentListService from '@modules/allocation/services/Investment/CreateInvestmentListService';

export default class InvestmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, objective_percentage, is_dollar } = request.body;
    const user_id = request.user.id;

    const createInvestmentList = container.resolve(CreateInvestmentListService);

    const investmentList = await createInvestmentList.execute({
      user_id,
      name,
      objective_percentage,
      is_dollar: !!is_dollar,
    });

    return response.status(201).json(investmentList);
  }
}
