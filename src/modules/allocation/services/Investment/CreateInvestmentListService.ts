import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IInvestmentRepository from '@modules/allocation/repositories/Investment/IInvestmentRepository';
import Investment from '@modules/allocation/infra/typeorm/entities/Investment';

interface IRequest {
  user_id: string;
  name: string;
  objective_percentage?: number;
  is_dollar: boolean;
}

@injectable()
class CreateInvestmentListService {
  constructor(
    @inject('InvestmentRepository')
    private investmentRepository: IInvestmentRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    is_dollar,
    objective_percentage,
  }: IRequest): Promise<Investment> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('User not found to create a investment list');
    }

    const investments = await this.investmentRepository.getAllUserInvestments(
      user_id,
    );

    if (objective_percentage) {
      const objectivePercentageSum = investments.reduce(
        (sum, sumInvestment) => {
          return sum + sumInvestment.objective_percentage;
        },
        0,
      );

      if (objectivePercentageSum + objective_percentage > 100) {
        throw new AppError(
          'The objective percentage of all investments is been reached',
        );
      }
    }

    const investment = await this.investmentRepository.create({
      user_id,
      name,
      is_dollar,
      objective_percentage: objective_percentage || 0,
    });

    return investment;
  }
}

export default CreateInvestmentListService;
