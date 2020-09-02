import { Response, Request } from 'express';
import { container } from 'tsyringe';
import GetTotalAvailable from '@modules/incomes/services/IncomeDistribution/GetTotalAvailable';

export default class TotalAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getIncomesDistribution = container.resolve(GetTotalAvailable);

    const value = await getIncomesDistribution.execute({
      user_id,
    });

    return response.json({ income_available: value });
  }
}
