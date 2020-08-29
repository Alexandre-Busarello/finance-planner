import IncomeDistributionSetting from '../../infra/typeorm/entities/IncomeDistributionSetting';
import ICreateIncomeSettingDTO from '../../dtos/ICreateIncomeSettingDTO';

export default interface IIncomeDistributionSettingsRepository {
  findById(id: string): Promise<IncomeDistributionSetting | undefined>;
  findByUser(userId: string): Promise<IncomeDistributionSetting[]>;
  create(data: ICreateIncomeSettingDTO): Promise<IncomeDistributionSetting>;
  save(user: IncomeDistributionSetting): Promise<IncomeDistributionSetting>;
}
