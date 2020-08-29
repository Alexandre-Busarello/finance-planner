import { injectable, inject } from 'tsyringe';
import IncomeDistributionSetting from '@modules/incomes/infra/typeorm/entities/IncomeDistributionSetting';
import IIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/IIncomeDistributionSettingsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListIncomeDistributionSettingsService {
  constructor(
    @inject('IncomeDistributionSettingsRepository')
    private incomeDistributionSettingRepository: IIncomeDistributionSettingsRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<IncomeDistributionSetting[]> {
    const incomeDistributionSettings = await this.incomeDistributionSettingRepository.findByUser(
      user_id,
    );

    return incomeDistributionSettings;
  }
}

export default ListIncomeDistributionSettingsService;
