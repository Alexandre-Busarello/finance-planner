import FakeIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/fakes/FakeIncomeDistributionSettingsRepository';
import ListIncomeDistributionSettingsService from './ListIncomeDistributionSettingsService';

let fakeIncomeDistributionSeetingsRepository: FakeIncomeDistributionSettingsRepository;
let listIncomeDistributionSettingsService: ListIncomeDistributionSettingsService;

describe('ListIncomeDistributionSettings', () => {
  beforeEach(() => {
    fakeIncomeDistributionSeetingsRepository = new FakeIncomeDistributionSettingsRepository();
    listIncomeDistributionSettingsService = new ListIncomeDistributionSettingsService(
      fakeIncomeDistributionSeetingsRepository,
    );
  });

  it('should be able to list all user income distribution settings', async () => {
    await fakeIncomeDistributionSeetingsRepository.create({
      user_id: 'user-1',
      description: 'Settings 1',
      percentage: 10,
    });

    await fakeIncomeDistributionSeetingsRepository.create({
      user_id: 'user-1',
      description: 'Settings 2',
      percentage: 20,
    });

    const settings = await listIncomeDistributionSettingsService.execute({
      user_id: 'user-1',
    });

    expect(settings.length).toBe(2);
  });

  it('should be returns a empty list if settings doesnt exists', async () => {
    const settings = await listIncomeDistributionSettingsService.execute({
      user_id: 'user-1',
    });

    expect(settings.length).toBe(0);
  });
});
