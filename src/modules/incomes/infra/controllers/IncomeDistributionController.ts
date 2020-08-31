import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateIncomesDistributionService from '@modules/incomes/services/IncomeDistribution/UpdateIncomesDistributionService';
import GetIncomesDistributionService from '@modules/incomes/services/IncomeDistribution/GetIncomesDistributionService';

export default class IncomeDistributionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const user_id = request.user.id;

    const getIncomesDistribution = container.resolve(
      GetIncomesDistributionService,
    );

    const incomes = await getIncomesDistribution.execute({
      user_id,
      month,
      year,
    });

    return response.json(incomes);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const incomes = request.body;

    const updateIncomesDistribution = container.resolve(
      UpdateIncomesDistributionService,
    );

    const updatedIncomes = await updateIncomesDistribution.execute(incomes);

    return response.json(updatedIncomes);
  }
}
