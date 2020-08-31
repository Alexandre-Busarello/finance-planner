import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Expense from '@modules/allocation/infra/typeorm/entities/Expense';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IInvestmentRepository from '@modules/allocation/repositories/Investment/IInvestmentRepository';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class CreateInvestmentListService {
  constructor(
    @inject('InvestmentRepository')
    private investmentRepository: IInvestmentRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<Expense> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('User not found to create a investment list');
    }

    const expense = await this.investmentRepository.create({
      user_id,
      name,
    });

    return expense;
  }
}

export default CreateInvestmentListService;
