import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/IMonthlyIncomeRepository';
import MonthlyIncome from '@modules/incomes/infra/typeorm/entities/MonthlyIncome';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
  value: number;
}

@injectable()
class CreateMonthlyIncomeService {
  constructor(
    @inject('MonthlyIncomeRepository')
    private monthlyIncomeRepository: IMonthlyIncomeRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    month,
    year,
    value,
  }: IRequest): Promise<MonthlyIncome> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('User not found to create a monthly income');
    }

    if (month < 1 || month > 12) {
      throw new AppError(
        'Invalid month. The month needs a value between 1 and 12',
      );
    }

    const monthlyIncome = await this.monthlyIncomeRepository.create({
      user_id,
      month,
      year,
      value,
    });

    return monthlyIncome;
  }
}

export default CreateMonthlyIncomeService;
