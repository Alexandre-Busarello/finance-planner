import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateIncomesDistributionService from '@modules/incomes/services/IncomeDistribution/UpdateIncomesDistributionService';
import GetIncomesDistributionService from '@modules/incomes/services/IncomeDistribution/GetIncomesDistributionService';

export default class IncomeDistributionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const user_id = request.user.id;

    const getIncomesDistribution = container.resolve(
      GetIncomesDistributionService,
    );

    const month_number = Number(month);
    const year_number = Number(year);

    const incomes = await getIncomesDistribution.execute({
      user_id,
      month: month_number,
      year: year_number,
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
