import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateExpenseListService from '@modules/allocation/services/Expense/CreateExpenseListService';

export default class ExpenseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const user_id = request.user.id;

    const createExpenseList = container.resolve(CreateExpenseListService);

    const expenseList = await createExpenseList.execute({
      user_id,
      name,
    });

    return response.status(201).json(expenseList);
  }
}
