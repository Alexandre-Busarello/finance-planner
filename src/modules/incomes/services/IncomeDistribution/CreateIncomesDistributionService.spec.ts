import FakeMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/fakes/FakeMonthlyIncomeRepository';
import FakeIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/fakes/FakeIncomeDistributionSettingsRepository';
import FakeIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/fakes/FakeIncomeDistributionRepository';

import CreateIncomesDistributionService from './CreateIncomesDistributionService';

let fakeIncomeDistributionSettingsRepository: FakeIncomeDistributionSettingsRepository;
let fakeMonthlyIncomeRepository: FakeMonthlyIncomeRepository;
let fakeIncomeDistributionRepository: FakeIncomeDistributionRepository;
let createIncomesDistributionService: CreateIncomesDistributionService;

describe('CreateIncomesDistribution', () => {
  beforeEach(() => {
    fakeIncomeDistributionSettingsRepository = new FakeIncomeDistributionSettingsRepository();
    fakeMonthlyIncomeRepository = new FakeMonthlyIncomeRepository();
    fakeIncomeDistributionRepository = new FakeIncomeDistributionRepository();
    createIncomesDistributionService = new CreateIncomesDistributionService(
      fakeIncomeDistributionSettingsRepository,
      fakeMonthlyIncomeRepository,
      fakeIncomeDistributionRepository,
    );
  });

  it('should be able to create a incomes distribution by monthly income and income settings', async () => {
    await fakeIncomeDistributionSettingsRepository.create({
      user_id: 'user-1',
      description: 'Despesas fixas (aluguel, luz e etc)',
      percentage: 50,
    });

    await fakeIncomeDistributionSettingsRepository.create({
      user_id: 'user-1',
      description: 'Investimentos',
      percentage: 50,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 5,
      year: 2020,
      value: 6000,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 5,
      year: 2020,
      value: 4000,
    });

    const incomeDistribution = await createIncomesDistributionService.execute({
      user_id: 'user-1',
      month: 5,
      year: 2020,
    });

    expect(incomeDistribution.length).toBe(2);
    expect(incomeDistribution[0].value).toEqual(5000);
    expect(incomeDistribution[0].description).toEqual(
      'Despesas fixas (aluguel, luz e etc)',
    );
    expect(incomeDistribution[1].value).toEqual(5000);
    expect(incomeDistribution[1].description).toEqual('Investimentos');
  });

  it('should be able to re-create a incomes distribution when a new monthly income is created for the same month', async () => {
    await fakeIncomeDistributionSettingsRepository.create({
      user_id: 'user-1',
      description: 'Despesas fixas (aluguel, luz e etc)',
      percentage: 50,
    });

    await fakeIncomeDistributionSettingsRepository.create({
      user_id: 'user-1',
      description: 'Investimentos',
      percentage: 50,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 5,
      year: 2020,
      value: 6000,
    });

    await createIncomesDistributionService.execute({
      user_id: 'user-1',
      month: 5,
      year: 2020,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 5,
      year: 2020,
      value: 6000,
    });

    const incomeDistribution = await createIncomesDistributionService.execute({
      user_id: 'user-1',
      month: 5,
      year: 2020,
    });

    expect(incomeDistribution.length).toBe(2);
    expect(incomeDistribution[0].value).toEqual(6000);
    expect(incomeDistribution[0].description).toEqual(
      'Despesas fixas (aluguel, luz e etc)',
    );
    expect(incomeDistribution[1].value).toEqual(6000);
    expect(incomeDistribution[1].description).toEqual('Investimentos');
  });
});
