import { uuid } from 'uuidv4';

import IncomeDistributionSetting from '@modules/incomes/infra/typeorm/entities/IncomeDistributionSetting';
import ICreateIncomeSettingDTO from '@modules/incomes/dtos/ICreateIncomeSettingDTO';
import IIncomeDistributionSettingsRepository from '../IIncomeDistributionSettingsRepository';

class FakeIncomeDistributionSettingsRepository
  implements IIncomeDistributionSettingsRepository {
  private incomeDistributionSettings: IncomeDistributionSetting[] = [];

  async findById(id: string): Promise<IncomeDistributionSetting | undefined> {
    const setting = this.incomeDistributionSettings.find(
      find => find.id === id,
    );
    return setting;
  }

  async findByUser(userId: string): Promise<IncomeDistributionSetting[]> {
    const settings = this.incomeDistributionSettings.filter(
      find => find.user_id === userId,
    );
    return settings;
  }

  async create(
    data: ICreateIncomeSettingDTO,
  ): Promise<IncomeDistributionSetting> {
    const incomeDistributionSetting = new IncomeDistributionSetting();

    Object.assign(incomeDistributionSetting, { id: uuid() }, data);
    this.incomeDistributionSettings.push(incomeDistributionSetting);

    return incomeDistributionSetting;
  }

  public async save(
    incomeDistributionSetting: IncomeDistributionSetting,
  ): Promise<IncomeDistributionSetting> {
    const findIndex = this.incomeDistributionSettings.findIndex(
      find => find.id === incomeDistributionSetting.id,
    );
    this.incomeDistributionSettings[findIndex] = incomeDistributionSetting;

    return incomeDistributionSetting;
  }
}

export default FakeIncomeDistributionSettingsRepository;
