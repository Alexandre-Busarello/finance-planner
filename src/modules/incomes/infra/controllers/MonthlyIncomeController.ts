import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateMonthlyIncomeService from '@modules/incomes/services/MonthlyIncome/CreateMonthlyIncomeService';
import CreateIncomesDistributionService from '@modules/incomes/services/IncomeDistribution/CreateIncomesDistributionService';

export default class MonthlyIncomeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { month, year, value } = request.body;
    const user_id = request.user.id;

    const createMonthlyIncome = container.resolve(CreateMonthlyIncomeService);

    const monthlyIncome = await createMonthlyIncome.execute({
      user_id,
      month,
      year,
      value,
    });

    const createIncomesDistribution = container.resolve(
      CreateIncomesDistributionService,
    );

    await createIncomesDistribution.execute({
      user_id,
      month,
      year,
    });

    return response.status(201).json(monthlyIncome);
  }
}
