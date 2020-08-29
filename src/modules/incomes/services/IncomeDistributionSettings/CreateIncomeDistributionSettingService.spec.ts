import AppError from '@shared/errors/AppError';
import FakeIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/fakes/FakeIncomeDistributionSettingsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateIncomeDistributionSettingService from './CreateIncomeDistributionSettingService';

let fakeIncomeDistributionSeetingsRepository: FakeIncomeDistributionSettingsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createIncomeDistributionSettingService: CreateIncomeDistributionSettingService;

describe('CreateIncomeDistributionSetting', () => {
  beforeEach(() => {
    fakeIncomeDistributionSeetingsRepository = new FakeIncomeDistributionSettingsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createIncomeDistributionSettingService = new CreateIncomeDistributionSettingService(
      fakeIncomeDistributionSeetingsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create one income distribution setting', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const setting = await createIncomeDistributionSettingService.execute({
      user_id: user.id,
      description: 'Test income distribution setting',
      percentage: 10,
    });

    expect(setting).toBeDefined();
    expect(setting.description).toEqual('Test income distribution setting');
    expect(setting.percentage).toEqual(10);
  });

  it('should not be able to create income setting if user doesnt exists', async () => {
    await expect(
      createIncomeDistributionSettingService.execute({
        user_id: 'non-existing user',
        description: 'Test income distribution setting',
        percentage: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create income distribution settings with exceeds 100%', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    await createIncomeDistributionSettingService.execute({
      user_id: user.id,
      description: 'Test income distribution setting',
      percentage: 10,
    });

    await expect(
      createIncomeDistributionSettingService.execute({
        user_id: user.id,
        description: 'Test income distribution setting',
        percentage: 95,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
