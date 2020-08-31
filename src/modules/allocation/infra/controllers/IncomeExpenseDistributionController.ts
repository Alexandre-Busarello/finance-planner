import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateExpenseValueService from '@modules/allocation/services/Expense/CreateExpenseValueService';

export default class IncomeExpenseDistributionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, value } = request.body;
    const { expense_id, origin_id } = request.params;

    const createExpenseValue = container.resolve(CreateExpenseValueService);

    const expenseValue = await createExpenseValue.execute({
      expense_id,
      origin_id,
      name,
      value,
    });

    return response.status(201).json(expenseValue);
  }
}
