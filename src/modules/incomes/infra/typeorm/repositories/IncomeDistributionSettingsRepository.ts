import IncomeDistributionSetting from '@modules/incomes/infra/typeorm/entities/IncomeDistributionSetting';
import ICreateIncomeSettingDTO from '@modules/incomes/dtos/ICreateIncomeSettingDTO';
import IIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/IIncomeDistributionSettingsRepository';
import { Repository, getRepository } from 'typeorm';

class IncomeDistributionSettingsRepository
  implements IIncomeDistributionSettingsRepository {
  private ormRepository: Repository<IncomeDistributionSetting>;

  constructor() {
    this.ormRepository = getRepository(IncomeDistributionSetting);
  }

  async findById(id: string): Promise<IncomeDistributionSetting | undefined> {
    const setting = this.ormRepository.findOne(id);
    return setting;
  }

  async findByUser(userId: string): Promise<IncomeDistributionSetting[]> {
    const settings = this.ormRepository.find({
      where: {
        user_id: userId,
      },
    });
    return settings;
  }

  async create({
    user_id,
    description,
    percentage,
  }: ICreateIncomeSettingDTO): Promise<IncomeDistributionSetting> {
    const incomeDistributionSetting = this.ormRepository.create({
      user_id,
      description,
      percentage,
    });

    this.ormRepository.save(incomeDistributionSetting);

    return incomeDistributionSetting;
  }

  public async save(
    incomeDistributionSetting: IncomeDistributionSetting,
  ): Promise<IncomeDistributionSetting> {
    this.ormRepository.save(incomeDistributionSetting);

    return incomeDistributionSetting;
  }
}

export default IncomeDistributionSettingsRepository;
