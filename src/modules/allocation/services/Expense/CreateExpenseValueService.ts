import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import IExpenseRepository from '@modules/allocation/repositories/Expense/IExpenseRepository';
import ExpenseValue from '@modules/allocation/infra/typeorm/entities/ExpenseValue';

interface IRequest {
  expense_id: string;
  name: string;
  value: number;
  origin_id: string;
}

@injectable()
class CreateExpenseValueService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute({
    expense_id,
    name,
    origin_id,
    value,
  }: IRequest): Promise<ExpenseValue> {
    const expenseValue = await this.expenseRepository.createValue({
      expense_id,
      name,
      origin_id,
      value,
    });

    return expenseValue;
  }
}

export default CreateExpenseValueService;
