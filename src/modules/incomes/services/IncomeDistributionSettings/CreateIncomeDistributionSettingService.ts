import { injectable, inject } from 'tsyringe';
import IncomeDistributionSetting from '@modules/incomes/infra/typeorm/entities/IncomeDistributionSetting';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/IIncomeDistributionSettingsRepository';

interface IRequest {
  user_id: string;
  description: string;
  percentage: number;
}

@injectable()
class CreateIncomeDistributionSettingService {
  constructor(
    @inject('IncomeDistributionSettingsRepository')
    private incomeDistributionSettingRepository: IIncomeDistributionSettingsRepository,
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    description,
    percentage,
  }: IRequest): Promise<IncomeDistributionSetting> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError(
        'User not found to create income distribution settings',
      );
    }

    const userSettings = await this.incomeDistributionSettingRepository.findByUser(
      user_id,
    );

    const percentageTotal = userSettings.reduce((sum, setting) => {
      return sum + setting.percentage;
    }, 0);

    if (percentageTotal + percentage > 100) {
      throw new AppError(
        'The income distribution setting for the user exceeds 100%',
      );
    }

    const incomeDistributionSetting = await this.incomeDistributionSettingRepository.create(
      {
        user_id,
        description,
        percentage,
      },
    );

    return incomeDistributionSetting;
  }
}

export default CreateIncomeDistributionSettingService;
