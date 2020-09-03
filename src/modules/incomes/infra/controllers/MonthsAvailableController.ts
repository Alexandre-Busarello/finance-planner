import { Response, Request } from 'express';
import { container } from 'tsyringe';
import GetMonthsWithIncomesAvailable from '@modules/incomes/services/IncomeDistribution/GetMonthsWithIncomesAvailable';

export default class MonthsAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year } = request.query;
    const user_id = request.user.id;

    const getMonthsAvailable = container.resolve(GetMonthsWithIncomesAvailable);

    const yearAsNumber = Number(year);

    const incomes = await getMonthsAvailable.execute({
      user_id,
      year: yearAsNumber,
    });

    return response.json(incomes);
  }
}
