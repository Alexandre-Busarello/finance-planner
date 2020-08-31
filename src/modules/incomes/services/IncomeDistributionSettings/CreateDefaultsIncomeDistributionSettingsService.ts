import { injectable, inject } from 'tsyringe';
import IncomeDistributionSetting from '@modules/incomes/infra/typeorm/entities/IncomeDistributionSetting';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/IIncomeDistributionSettingsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class CreateDefaultsIncomeDistributionSettingsService {
  constructor(
    @inject('IncomeDistributionSettingsRepository')
    private incomeDistributionSettingRepository: IIncomeDistributionSettingsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<IncomeDistributionSetting[]> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError(
        'User not found to create defaults income distribution settings',
      );
    }

    const fixedExpenses = await this.incomeDistributionSettingRepository.create(
      {
        user_id,
        description: 'Gastos fixos mensais (Necessidades)',
        percentage: 50.0,
      },
    );

    const shortAndMediumTermGoals = await this.incomeDistributionSettingRepository.create(
      {
        user_id,
        description:
          'Objetivos de curto e médio prazo (Sonhos, projetos e etc)',
        percentage: 10.0,
      },
    );

    const recreation = await this.incomeDistributionSettingRepository.create({
      user_id,
      description: 'Lazer (entretenimento, saidas e etc)',
      percentage: 7.5,
    });

    const education = await this.incomeDistributionSettingRepository.create({
      user_id,
      description: 'Educação (cursos, livros e etc)',
      percentage: 7.5,
    });

    const financialIndependence = await this.incomeDistributionSettingRepository.create(
      {
        user_id,
        description: 'Independencia financeira (Investimento de longo prazo)',
        percentage: 25,
      },
    );

    return [
      fixedExpenses,
      shortAndMediumTermGoals,
      recreation,
      education,
      financialIndependence,
    ];
  }
}

export default CreateDefaultsIncomeDistributionSettingsService;
