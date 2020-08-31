import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IExpenseRepository from '@modules/allocation/repositories/Expense/IExpenseRepository';
import Expense from '@modules/allocation/infra/typeorm/entities/Expense';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class CreateExpenseListService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<Expense> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError(
        'User not found to create defaults income distribution settings',
      );
    }

    const expense = await this.expenseRepository.create({
      user_id,
      name,
    });

    return expense;
  }
}

export default CreateExpenseListService;
