import { injectable, inject } from 'tsyringe';
import IncomeDistributionSetting from '@modules/incomes/infra/typeorm/entities/IncomeDistributionSetting';
import AppError from '@shared/errors/AppError';
import IIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/IIncomeDistributionSettingsRepository';

interface IRequest {
  income_distribution_id: string;
  description: string;
  percentage: number;
}

@injectable()
class UpdateIncomeDistributionSettingService {
  constructor(
    @inject('IncomeDistributionSettingsRepository')
    private incomeDistributionSettingRepository: IIncomeDistributionSettingsRepository,
  ) {}

  public async execute({
    income_distribution_id,
    description,
    percentage,
  }: IRequest): Promise<IncomeDistributionSetting> {
    const incomeDistributionSetting = await this.incomeDistributionSettingRepository.findById(
      income_distribution_id,
    );

    if (!incomeDistributionSetting) {
      throw new AppError('Income distribution setting not found');
    }

    const userSettings = await this.incomeDistributionSettingRepository.findByUser(
      incomeDistributionSetting.user_id,
    );

    const percentageTotal = userSettings.reduce((sum, setting) => {
      return sum + setting.percentage;
    }, 0);

    if (percentageTotal + percentage > 100) {
      throw new AppError(
        'The income distribution setting for the user exceeds 100%',
      );
    }

    Object.assign(incomeDistributionSetting, { description, percentage });

    const updatedIncomeDistributionSetting = await this.incomeDistributionSettingRepository.save(
      incomeDistributionSetting,
    );

    return updatedIncomeDistributionSetting;
  }
}

export default UpdateIncomeDistributionSettingService;
