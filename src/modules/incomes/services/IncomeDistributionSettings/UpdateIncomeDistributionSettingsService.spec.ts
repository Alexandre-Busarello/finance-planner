import AppError from '@shared/errors/AppError';
import FakeIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/fakes/FakeIncomeDistributionSettingsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateIncomeDistributionSettingService from './CreateIncomeDistributionSettingService';
import UpdateIncomeDistributionSettingService from './UpdateIncomeDistributionSettingService';

let fakeIncomeDistributionSeetingsRepository: FakeIncomeDistributionSettingsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createIncomeDistributionSettingService: CreateIncomeDistributionSettingService;
let updateIncomeDistributionSettingService: UpdateIncomeDistributionSettingService;

describe('UpdateIncomeDistributionSettings', () => {
  beforeEach(() => {
    fakeIncomeDistributionSeetingsRepository = new FakeIncomeDistributionSettingsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createIncomeDistributionSettingService = new CreateIncomeDistributionSettingService(
      fakeIncomeDistributionSeetingsRepository,
      fakeUsersRepository,
    );
    updateIncomeDistributionSettingService = new UpdateIncomeDistributionSettingService(
      fakeIncomeDistributionSeetingsRepository,
    );
  });

  it('should be able to update one income distribution settings', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const setting = await createIncomeDistributionSettingService.execute({
      user_id: user.id,
      description: 'abc',
      percentage: 10,
    });

    const updatedSetting = await updateIncomeDistributionSettingService.execute(
      {
        income_distribution_id: setting.id,
        description: 'abcd',
        percentage: 15,
      },
    );

    expect(updatedSetting.description).toEqual('abcd');
    expect(updatedSetting.percentage).toEqual(15);
  });

  it('should not be able to update income setting if income distribution setting not exists', async () => {
    await expect(
      updateIncomeDistributionSettingService.execute({
        income_distribution_id: 'non-existing id',
        description: 'abcd',
        percentage: 15,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update income distribution settings with exceeds 100%', async () => {
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

    const setting = await createIncomeDistributionSettingService.execute({
      user_id: user.id,
      description: 'Test income distribution setting',
      percentage: 90,
    });

    await expect(
      updateIncomeDistributionSettingService.execute({
        income_distribution_id: setting.id,
        description: 'Test income distribution setting',
        percentage: 95,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
