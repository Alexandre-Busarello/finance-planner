import AppError from '@shared/errors/AppError';
import FakeIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/fakes/FakeIncomeDistributionSettingsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateDefaultsIncomeDistributionSettingsService from './CreateDefaultsIncomeDistributionSettingsService';

let fakeIncomeDistributionSeetingsRepository: FakeIncomeDistributionSettingsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createDefaultIncomeDistributionSettingsService: CreateDefaultsIncomeDistributionSettingsService;

describe('CreateDefaultsIncomeDistributionSettings', () => {
  beforeEach(() => {
    fakeIncomeDistributionSeetingsRepository = new FakeIncomeDistributionSettingsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createDefaultIncomeDistributionSettingsService = new CreateDefaultsIncomeDistributionSettingsService(
      fakeIncomeDistributionSeetingsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create all defaults income distribution settings', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const settings = await createDefaultIncomeDistributionSettingsService.execute(
      {
        user_id: user.id,
      },
    );

    const percentageTotal = settings.reduce((percentageSum, setting) => {
      return percentageSum + setting.percentage;
    }, 0);

    expect(settings.length).toBe(5);
    expect(percentageTotal).toBe(100);
  });

  it('should not be able to create income settings if user doesnt exists', async () => {
    await expect(
      createDefaultIncomeDistributionSettingsService.execute({
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
