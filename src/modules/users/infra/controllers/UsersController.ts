import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import CreateDefaultsIncomeDistributionSettingsService from '@modules/incomes/services/IncomeDistributionSettings/CreateDefaultsIncomeDistributionSettingsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const createDefaultsIncomeDistributionSettingsService = container.resolve(
      CreateDefaultsIncomeDistributionSettingsService,
    );

    createDefaultsIncomeDistributionSettingsService.execute({
      user_id: user.id,
    });

    return response.status(201).json(classToClass(user));
  }
}
