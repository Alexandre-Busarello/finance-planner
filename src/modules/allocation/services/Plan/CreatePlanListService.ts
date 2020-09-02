import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPlanRepository from '@modules/allocation/repositories/Plan/IPlanRepository';
import Plan from '@modules/allocation/infra/typeorm/entities/Plan';

interface IRequest {
  user_id: string;
  name: string;
  objective_value: number;
  accomplished_value: number;
}

@injectable()
class CreatePlanListService {
  constructor(
    @inject('PlanRepository')
    private plansRepository: IPlanRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    objective_value,
    accomplished_value,
  }: IRequest): Promise<Plan> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('User not found to create a investment list');
    }

    const expense = await this.plansRepository.create({
      user_id,
      name,
      objective_value,
      accomplished_value,
    });

    return expense;
  }
}

export default CreatePlanListService;
